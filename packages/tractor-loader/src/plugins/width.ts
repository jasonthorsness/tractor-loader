import sharp from "sharp";
import { parseOptions } from "./helpers";

const plugin = { parse, apply };
export default plugin;

export interface ParsedWidth {
  width: number;
  options: { [key: string]: unknown };
}

function parse(v: string): ParsedWidth {
  const [vv, options] = parseOptions(v);

  if (vv == "") {
    throw new Error(`no height provided`);
  }

  const width = Number(vv);

  if (isNaN(width)) {
    throw new Error(`failed to parse number ${v}`);
  }

  return { width, options };
}

function apply(parsed: ParsedWidth, metadata: sharp.Metadata, working: sharp.Sharp): sharp.Sharp {
  if (metadata.width == null || metadata.width == null) {
    throw new Error("unable to read source image dimensions");
  }

  const resizeOptions = {
    width: Math.round(parsed.width),
    ...parsed.options,
  };

  return working.resize(resizeOptions);
}
