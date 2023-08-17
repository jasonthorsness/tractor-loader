import { describe, expect, test } from "@jest/globals";
import width, { ParsedWidth } from "../src/plugins/width";
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
  const testCases: { input: string; parsed: ParsedWidth; applied: sharp.Sharp }[] = [
    {
      input: "400",
      parsed: {
        width: 400,
        options: {},
      },
      applied: {
        resize: {
          width: 400,
        },
      } as any,
    },
    {
      input: "400;fit:contain",
      parsed: {
        width: 400,
        options: { fit: "contain" },
      },
      applied: {
        resize: {
          fit: "contain",
          width: 400,
        },
      } as any,
    },
  ];

  testCases.forEach(({ input, parsed, applied }) => {
    test(input, () => {
      expect(width.parse(input)).toEqual(parsed);
      expect(
        (
          width.apply(
            parsed,
            { height: 1000, width: 1000 } as sharp.Metadata,
            new MockSharp() as any,
          ) as any
        ).applied,
      ).toEqual(applied);
    });
  });

  test("parse", () => {
    expect(() => width.parse("")).toThrow(Error);
    expect(() => width.parse("z")).toThrow(Error);
    expect(() => width.parse("10:blah")).toThrow(Error);
  });

  test("apply", () => {
    const s: sharp.Sharp = new MockSharp() as any;
    let p = width.parse("400");
    expect(() => width.apply(p, {} as sharp.Metadata, s)).toThrow(Error);
  });
});
