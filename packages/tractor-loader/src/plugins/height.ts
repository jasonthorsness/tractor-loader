import sharp from "sharp";
import { parseOptions } from "./helpers";

const plugin = { parse, apply };
export default plugin;

export interface ParsedHeight {
  height: number;
  options: { [key: string]: unknown };
}

function parse(v: string): ParsedHeight {
  const [vv, options] = parseOptions(v);

  if (vv == "") {
    throw new Error(`no height provided`);
  }

  const height = Number(vv);

  if (isNaN(height)) {
    throw new Error(`failed to parse number ${v}`);
  }

  return { height, options };
}

function apply(parsed: ParsedHeight, metadata: sharp.Metadata, working: sharp.Sharp): sharp.Sharp {
  if (metadata.height == null || metadata.height == null) {
    throw new Error("unable to read source image dimensions");
  }

  const resizeOptions = {
    height: Math.round(parsed.height),
    ...parsed.options,
  };

  return working.resize(resizeOptions);
}
