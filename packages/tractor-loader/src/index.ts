import type { LoaderContext } from "webpack";
import sharp from "sharp";
import aspect from "./plugins/aspect";
import crop from "./plugins/crop";
import height from "./plugins/width";
import width from "./plugins/width";

const defaultPlugins = {
  aspect,
  crop,
  height,
  width,
};

export interface Plugin {
  parse: (v: string) => any;
  apply: (v: any, metadata: sharp.Metadata, working: sharp.Sharp) => sharp.Sharp;
}

export interface PluginMap {
  [key: string]: Plugin;
}

export interface PresetMap {
  [key: string]: string;
}

export interface Options {
  plugins: PluginMap;
  presets: PresetMap;
}

export const raw = true;

export default function loader(this: LoaderContext<Options>, source: Buffer): Buffer | undefined {
  const options = this.getOptions();
  const plugins: PluginMap = { ...defaultPlugins, ...options.plugins };
  const presets: PresetMap = options.presets;

  const parsed = tryParse(plugins, presets, this.resourceQuery);
  if (parsed == null) {
    return source;
  }
  const callback = this.async();
  apply(source, parsed)
    .then((applied) => {
      if (applied == null) {
        callback(null, source);
      } else {
        callback(null, applied as Buffer);
      }
    })
    .catch((err) => {
      callback(err);
    });

  // this.async() causes webpack to wait for the callback to be called
  return;
}

type ParsedStage = {
  plugin: Plugin;
  parsed: any;
};

function tryParse(plugins: PluginMap, presets: PresetMap, query: string): ParsedStage[] | null {
  if (!/^\?.+&tractor$/.test(query)) {
    return null;
  }
  const queryParts = query.slice(1).split("&");
  queryParts.pop();

  const expandedQueryParts: string[] = [];
  queryParts.forEach((queryPart: string) => {
    if (queryPart == "") {
      throw new Error(`extra & in query string`);
    }
    const split = queryPart.split("=");
    if (split.length == 1 && presets[split[0]] != null) {
      expandedQueryParts.push(...presets[split[0]].split("&"));
    } else {
      expandedQueryParts.push(queryPart);
    }
  });

  const stages: ParsedStage[] = [];
  expandedQueryParts.forEach((queryPart: string) => {
    const split = queryPart.split("=");
    const plugin = plugins[split[0]];
    if (plugin) {
      const parsed = plugin.parse(split[1]);
      if (parsed) {
        stages.push({ plugin, parsed });
      }
    } else {
      throw new Error(`unknown plugin ${split[0]}`);
    }
  });
  return stages;
}

async function apply(source: Buffer, stages: ParsedStage[]): Promise<Buffer> {
  let working = sharp(source);

  const originalMetadata = await working.metadata();
  if (originalMetadata == null || originalMetadata.format == null) {
    throw new Error("unable to read source image fprmat");
  }

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];

    const metadata = await working.metadata();
    if (metadata == null) {
      throw new Error("unable to read source image metadata");
    }

    working = stage.plugin.apply(stage.parsed, metadata, working);

    if (i == stages.length - 1) {
      working = working.toFormat(originalMetadata.format);
    } else {
      working = working.raw();
      const tmp = await working.toBuffer({ resolveWithObject: true });
      working = sharp(tmp.data, { raw: tmp.info });
    }
  }

  const output = await working.toBuffer();
  return output;
}
