import { describe, expect, test } from "@jest/globals";
import aspect, { ParsedAspect } from "../src/plugins/aspect";
import sharp, { Metadata } from "sharp";

class MockSharp {
  applied: { [key: string]: any } = {};
  constructor() {}
  resize(options: any) {
    this.applied["resize"] = options;
    return this;
  }
}

describe("crop", () => {
  const metadata: Metadata = { width: 1000, height: 1000 } as Metadata;
  const testCases: { input: string; parsed: ParsedAspect; applied: sharp.Sharp }[] = [
    {
      input: "16:9",
      parsed: {
        width: 16,
        height: 9,
        options: {},
      },
      applied: {
        resize: {
          width: metadata.width,
          height: Math.round((metadata.height as number) * (9 / 16)),
        },
      } as any,
    },
    {
      input: "1:4;fit:contain",
      parsed: {
        width: 1,
        height: 4,
        options: { fit: "contain" },
      },
      applied: {
        resize: {
          fit: "contain",
          width: Math.round(metadata.width as number) * (1 / 4),
          height: metadata.height,
        },
      } as any,
    },
  ];

  testCases.forEach(({ input, parsed, applied }) => {
    test(input, () => {
      expect(aspect.parse(input)).toEqual(parsed);
      expect(
        (
          aspect.apply(
            parsed,
            { width: 1000, height: 1000 } as sharp.Metadata,
            new MockSharp() as any,
          ) as any
        ).applied,
      ).toEqual(applied);
    });
  });

  test("parse", () => {
    expect(() => aspect.parse("")).toThrow(Error);
    expect(() => aspect.parse("z")).toThrow(Error);
    expect(() => aspect.parse("10")).toThrow(Error);
    expect(() => aspect.parse("10:blah")).toThrow(Error);
    expect(() => aspect.parse("10:5;ZZZ")).toThrow(Error);
  });

  test("apply", () => {
    const s: sharp.Sharp = new MockSharp() as any;
    let p = aspect.parse("16:9");
    expect(() => aspect.apply(p, {} as sharp.Metadata, s)).toThrow(Error);
  });
});
