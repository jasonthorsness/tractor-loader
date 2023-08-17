export function parseOptions(v: string): [string, { [key: string]: unknown }] {
  const parts = v.split(";");
  const first = parts.shift() as string;
  if (parts.length < 1) {
    return [first, {}];
  }
  const options: { [key: string]: unknown } = {};
  while (parts.length > 0) {
    const part = parts.shift() as string;
    const kv = part.split(":");
    if (kv.length != 2) {
      throw new Error(`unexpected ${v}`);
    }
    options[kv[0]] = kv[1];
  }
  return [first, options];
}
