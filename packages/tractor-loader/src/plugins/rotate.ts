import sharp from "sharp";
import { parseOptions } from "./helpers";

const plugin = { parse, apply };
export default plugin;

export interface ParsedRotate {
  rotate: number;
  options: { [key: string]: unknown };
}

function parse(v: string): ParsedRotate {
  const [vv, options] = parseOptions(v);

  if (vv == "") {
    throw new Error(`no rotation provided`);
  }

  const rotate = Number(vv);

  if (isNaN(rotate)) {
    throw new Error(`failed to parse number ${v}`);
  }

  return { rotate, options };
}

function apply(parsed: ParsedRotate, _: sharp.Metadata, working: sharp.Sharp): sharp.Sharp {
  return working.rotate(parsed.rotate, parsed.options);
}
