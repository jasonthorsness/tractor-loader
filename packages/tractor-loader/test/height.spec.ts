import { describe, expect, test } from "@jest/globals";
import height, { ParsedHeight } from "../src/plugins/height";
import sharp from "sharp";

class MockSharp {
  applied: { [key: string]: any } = {};
  constructor() {}
  resize(options: any) {
    this.applied["resize"] = options;
    return this;
  }
}

describe("crop", () => {
  const testCases: { input: string; parsed: ParsedHeight; applied: sharp.Sharp }[] = [
    {
      input: "400",
      parsed: {
        height: 400,
        options: {},
      },
      applied: {
        resize: {
          height: 400,
        },
      } as any,
    },
    {
      input: "400;fit:contain",
      parsed: {
        height: 400,
        options: { fit: "contain" },
      },
      applied: {
        resize: {
          fit: "contain",
          height: 400,
        },
      } as any,
    },
  ];

  testCases.forEach(({ input, parsed, applied }) => {
    test(input, () => {
      expect(height.parse(input)).toEqual(parsed);
      expect(
        (
          height.apply(
            parsed,
            { width: 1000, height: 1000 } as sharp.Metadata,
            new MockSharp() as any,
          ) as any
        ).applied,
      ).toEqual(applied);
    });
  });

  test("parse", () => {
    expect(() => height.parse("")).toThrow(Error);
    expect(() => height.parse("z")).toThrow(Error);
    expect(() => height.parse("10:blah")).toThrow(Error);
  });

  test("apply", () => {
    const s: sharp.Sharp = new MockSharp() as any;
    let p = height.parse("400");
    expect(() => height.apply(p, {} as sharp.Metadata, s)).toThrow(Error);
  });
});
