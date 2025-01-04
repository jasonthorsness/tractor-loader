import { describe, expect, test } from "@jest/globals";
import rotate, { ParsedRotate } from "../src/plugins/rotate";
import sharp from "sharp";

class MockSharp {
  applied: { [key: string]: any } = {};
  constructor() {}
  rotate(rotate: number, options: any) {
    this.applied["rotate"] = { rotate, options };
    return this;
  }
}

describe("rotate", () => {
  const testCases: {
    input: string;
    parsed: ParsedRotate;
    applied: { rotate: Number; options: { [key: string]: any } };
  }[] = [
    {
      input: "5",
      parsed: {
        rotate: 5,
        options: {},
      },
      applied: {
        rotate: {
          rotate: 5,
          options: {},
        },
      } as any,
    },
    {
      input: "-5;background:#555555",
      parsed: {
        rotate: -5,
        options: { background: "#555555" },
      },
      applied: {
        rotate: {
          rotate: -5,
          options: { background: "#555555" },
        },
      } as any,
    },
  ];
  testCases.forEach(({ input, parsed, applied }) => {
    test(input, () => {
      expect(rotate.parse(input)).toEqual(parsed);
      expect(
        (
          rotate.apply(
            parsed,
            { width: 1000, height: 1000 } as sharp.Metadata,
            new MockSharp() as any,
          ) as any
        ).applied,
      ).toEqual(applied);
    });
  });

  test("parse", () => {
    expect(() => rotate.parse("")).toThrow(Error);
    expect(() => rotate.parse("z")).toThrow(Error);
    expect(() => rotate.parse("10:blah")).toThrow(Error);
  });
});
