import sharp from "sharp";
import { parseOptions } from "./helpers";

const plugin = { parse, apply };
export default plugin;

export interface ParsedAspect {
  width: number;
  height: number;
  options: { [key: string]: unknown };
}

function parse(v: string): ParsedAspect {
  const [vv, options] = parseOptions(v);
  const vvv = vv.split(":");

  if (vvv.length != 2) {
    throw new Error(`expected width:height, got ${vv}`);
  }

  const width = Number(vvv[0]);
  const height = Number(vvv[1]);

  if (isNaN(width) || isNaN(height)) {
    throw new Error(`failed to parse numbers ${v}`);
  }

  return { width, height, options };
}

function apply(parsed: ParsedAspect, metadata: sharp.Metadata, working: sharp.Sharp): sharp.Sharp {
  if (metadata.width == null || metadata.height == null) {
    throw new Error("unable to read source image dimensions");
  }

  const originalAspectRatio = metadata.width / metadata.height;
  let width, height;

  const r = parsed.width / parsed.height;

  if (originalAspectRatio > r) {
    height = metadata.height;
    width = height * r;
  } else {
    width = metadata.width;
    height = width / r;
  }

  const resizeOptions = {
    width: Math.round(width),
    height: Math.round(height),
    ...parsed.options,
  };

  return working.resize(resizeOptions);
}
