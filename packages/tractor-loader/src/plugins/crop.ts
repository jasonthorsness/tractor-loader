import sharp from "sharp";
import { parseOptions } from "./helpers";

const plugin = { parse, apply };
export default plugin;

export interface ParsedCropPart {
  origin: "l" | "t" | "r" | "b" | "o" | "w" | "h";
  value: number;
  unit: "" | "%";
}

export interface ParsedCrop {
  ax: ParsedCropPart;
  ay: ParsedCropPart;
  bx: ParsedCropPart;
  by: ParsedCropPart;
  ox: ParsedCropPart;
  oy: ParsedCropPart;
  options: { [key: string]: unknown };
}

function parse(v: string): ParsedCrop {
  const [vv, options] = parseOptions(v);

  const split = vv.split(",");

  if (split.length !== 4 && split.length !== 6) {
    throw new Error(`expected ax,ay,bx,by or ax,ay,bx,by,ox,oy, got ${v}`);
  }

  const ax = parsePart(split[0], "l", ["l", "r", "o"]);
  const ay = parsePart(split[1], "t", ["t", "b", "o"]);
  const bx = parsePart(split[2], "r", ["l", "r", "o", "w"]);
  const by = parsePart(split[3], "b", ["t", "b", "o", "h"]);

  const ox: ParsedCropPart | null =
    split.length === 4
      ? { origin: "l", value: 50, unit: "%" }
      : parsePart(split[4], "l", ["l", "r"]);

  const oy: ParsedCropPart | null =
    split.length === 4
      ? { origin: "t", value: 50, unit: "%" }
      : parsePart(split[5], "t", ["t", "b"]);

  return { ax, ay, bx, by, ox, oy, options };
}

function apply(parsed: ParsedCrop, metadata: sharp.Metadata, working: sharp.Sharp): sharp.Sharp {
  if (metadata.width == null || metadata.height == null) {
    throw new Error("unable to read source image dimensions");
  }

  let resolved = resolveCrop(parsed, metadata.width, metadata.height);

  if (resolved.extract != null) {
    return working.extract(resolved.extract);
  }

  if (resolved.extend != null) {
    return working.extend(resolved.extend);
  }

  return working;
}

function parsePart(
  v: string,
  defaultOrigin: "l" | "t" | "r" | "b" | "o" | "w" | "h",
  allowed: string[],
): ParsedCropPart {
  if (v.length < 1) {
    throw new Error("expected crop part to be non-empty");
  }

  let origin = defaultOrigin;
  switch (v[0]) {
    case "l":
    case "t":
    case "r":
    case "b":
    case "o":
    case "w":
    case "h":
      if (!allowed.includes(v[0])) {
        throw new Error(`unexpected origin ${v[0]}`);
      }
      origin = v[0];
      v = v.slice(1);
      break;
  }

  let unit: "" | "%" = "";
  if (v.endsWith("%")) {
    unit = "%";
    v = v.slice(0, -1);
  }

  const value = Number(v);
  if (isNaN(value)) {
    throw new Error(`failed to parse number ${v}`);
  }

  return { origin, value, unit };
}

interface Extract {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Extend {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface ResolvedCrop {
  extract: Extract | null;
  extend: Extend | null;
}

function resolveCrop(v: ParsedCrop, w: number, h: number): ResolvedCrop {
  const rox = resolveCropPart(v.ox, 0, 0, w);
  const roy = resolveCropPart(v.oy, 0, 0, h);

  let rax = resolveCropPart(v.ax, rox, 0, w);
  let ray = resolveCropPart(v.ay, roy, 0, h);
  let rbx = resolveCropPart(v.bx, rox, rax, w);
  let rby = resolveCropPart(v.by, roy, ray, h);

  if ((rax >= w && rbx >= w) || (ray >= h && rby >= h)) {
    throw new Error("crop region is fully outside of image bounds");
  }

  if (rax > rbx) {
    const tmp = rax;
    rax = rbx;
    rbx = tmp;
  }

  if (ray > rby) {
    const tmp = ray;
    ray = rby;
    rby = tmp;
  }

  let el = 0;
  if (rax < 0) {
    el = -rax;
    rax = 0;
  }

  let et = 0;
  if (ray < 0) {
    et = -ray;
    ray = 0;
  }

  let er = 0;
  if (rbx > w) {
    er = rbx - w;
    rbx = w;
  }

  let eb = 0;
  if (rby > h) {
    eb = rby - h;
    rby = h;
  }

  let extract: Extract | null = null;
  if (rax != 0 || ray != 0 || rbx != w || rby != h) {
    extract = {
      left: rax,
      top: ray,
      width: rbx - rax,
      height: rby - ray,
    };
  }
  let extend: Extend | null = null;
  if (el != 0 || et != 0 || er != 0 || eb != 0) {
    extend = {
      left: el,
      top: et,
      right: er,
      bottom: eb,
      ...v.options,
    };
  }

  return { extract, extend };
}

function resolveCropPart(v: ParsedCropPart, o: number, r: number, m: number): number {
  let delta = v.value;
  if (v.unit === "%") {
    delta = (m * v.value) / 100;
  }
  delta = Math.round(delta);
  switch (v.origin) {
    case "l":
    case "t":
      return delta;
    case "r":
    case "b":
      return m - delta;
    case "o":
      return o + delta;
    case "w":
    case "h":
      return r + delta;
    default:
      throw new Error(`internal error: unknown origin: ${v.origin}`);
  }
}
