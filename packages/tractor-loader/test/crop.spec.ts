import { describe, expect, test } from "@jest/globals";
import crop, { ParsedCrop } from "../src/plugins/crop";
import sharp, { Metadata } from "sharp";

class MockSharp {
  applied: { [key: string]: any } = {};
  constructor() {}
  extract(options: any) {
    this.applied["extract"] = options;
    return this;
  }
  extend(options: any) {
    this.applied["extend"] = options;
    return this;
  }
}

describe("crop", () => {
  const metadata: Metadata = { width: 1000, height: 1000 } as Metadata;
  const testCases: { input: string; parsed: ParsedCrop; applied: sharp.Sharp }[] = [
    {
      input: "0,100,0,100",
      parsed: {
        ax: { origin: "l", value: 0, unit: "" },
        ay: { origin: "t", value: 100, unit: "" },
        bx: { origin: "r", value: 0, unit: "" },
        by: { origin: "b", value: 100, unit: "" },
        ox: { origin: "l", value: 50, unit: "%" },
        oy: { origin: "t", value: 50, unit: "%" },
        options: {},
      },
      applied: {
        extract: {
          left: 0,
          top: 100,
          width: metadata.width,
          height: (metadata.height as number) - 200,
        },
      } as any,
    },
    {
      input: "10%,10%,10%,10%",
      parsed: {
        ax: { origin: "l", value: 10, unit: "%" },
        ay: { origin: "t", value: 10, unit: "%" },
        bx: { origin: "r", value: 10, unit: "%" },
        by: { origin: "b", value: 10, unit: "%" },
        ox: { origin: "l", value: 50, unit: "%" },
        oy: { origin: "t", value: 50, unit: "%" },
        options: {},
      },
      applied: {
        extract: {
          left: 100,
          top: 100,
          width: (metadata.width as number) - 200,
          height: (metadata.height as number) - 200,
        },
      } as any,
    },
    {
      input: "o-10,o-10,w20,h20,60%,60%",
      parsed: {
        ax: { origin: "o", value: -10, unit: "" },
        ay: { origin: "o", value: -10, unit: "" },
        bx: { origin: "w", value: 20, unit: "" },
        by: { origin: "h", value: 20, unit: "" },
        ox: { origin: "l", value: 60, unit: "%" },
        oy: { origin: "t", value: 60, unit: "%" },
        options: {},
      },
      applied: {
        extract: {
          left: 590,
          top: 590,
          width: 20,
          height: 20,
        },
      } as any,
    },
    {
      input: "-10,-10,-10,-10;background:rgb(255,255,255)",
      parsed: {
        ax: { origin: "l", value: -10, unit: "" },
        ay: { origin: "t", value: -10, unit: "" },
        bx: { origin: "r", value: -10, unit: "" },
        by: { origin: "b", value: -10, unit: "" },
        ox: { origin: "l", value: 50, unit: "%" },
        oy: { origin: "t", value: 50, unit: "%" },
        options: {
          background: "rgb(255,255,255)",
        },
      },
      applied: {
        extend: {
          top: 10,
          left: 10,
          bottom: 10,
          right: 10,
          background: "rgb(255,255,255)",
        },
      } as any,
    },
    {
      input: "0,0,0,0",
      parsed: {
        ax: { origin: "l", value: 0, unit: "" },
        ay: { origin: "t", value: 0, unit: "" },
        bx: { origin: "r", value: 0, unit: "" },
        by: { origin: "b", value: 0, unit: "" },
        ox: { origin: "l", value: 50, unit: "%" },
        oy: { origin: "t", value: 50, unit: "%" },
        options: {},
      },
      applied: {} as any,
    },
    {
      input: "800,800,800,800",
      parsed: {
        ax: { origin: "l", value: 800, unit: "" },
        ay: { origin: "t", value: 800, unit: "" },
        bx: { origin: "r", value: 800, unit: "" },
        by: { origin: "b", value: 800, unit: "" },
        ox: { origin: "l", value: 50, unit: "%" },
        oy: { origin: "t", value: 50, unit: "%" },
        options: {},
      },
      applied: {
        extract: {
          left: 200,
          top: 200,
          width: 600,
          height: 600,
        },
      } as any,
    },
  ];

  testCases.forEach(({ input, parsed, applied }) => {
    test(input, () => {
      expect(crop.parse(input)).toEqual(parsed);
      expect(
        (
          crop.apply(
            parsed,
            { width: 1000, height: 1000 } as sharp.Metadata,
            new MockSharp() as any,
          ) as any
        ).applied,
      ).toEqual(applied);
    });
  });

  test("parse", () => {
    expect(() => crop.parse("")).toThrow(Error);
    expect(() => crop.parse("z")).toThrow(Error);
    expect(() => crop.parse("10")).toThrow(Error);
    expect(() => crop.parse("10,,10,10")).toThrow(Error);
    expect(() => crop.parse("10,aa,10,10")).toThrow(Error);
    expect(() => crop.parse("10,10")).toThrow(Error);
    expect(() => crop.parse("10,10,10")).toThrow(Error);
    expect(() => crop.parse("t10,10,10,10")).toThrow(Error);
    expect(() => crop.parse("10,l10,10,10")).toThrow(Error);
    expect(() => crop.parse("10,10,b10,10")).toThrow(Error);
    expect(() => crop.parse("10,10,10,r10")).toThrow(Error);
    expect(() => crop.parse("10,10,10,10,10")).toThrow(Error);
    expect(() => crop.parse("10,10,10,10,t10,10")).toThrow(Error);
    expect(() => crop.parse("10,10,10,10,10,l10")).toThrow(Error);
    expect(() => crop.parse("10,10,10,10,10,10,10")).toThrow(Error);
    expect(() => crop.parse("10,10,10,10,10,10,10;aa")).toThrow(Error);
    expect(() => crop.parse(";background=red")).toThrow(Error);
    expect(() => crop.parse("10,10,10,10;;background=red")).toThrow(Error);
    expect(() => crop.parse(null as any)).toThrow(Error);
  });

  test("apply", () => {
    const s: sharp.Sharp = new MockSharp() as any;
    let m = { width: 1000, height: 1000 } as sharp.Metadata;
    let p = crop.parse("10,10,10,10");

    expect(() => crop.apply(p, {} as sharp.Metadata, s)).toThrow(Error);

    p = crop.parse("2000,0,l2100,0");
    expect(() => crop.apply(p, m, s)).toThrow(Error);

    p = crop.parse("0,2000,0,t2100");
    expect(() => crop.apply(p, m, s)).toThrow(Error);

    p = crop.parse("10,10,10,10");
    p.ax = { origin: "x" as any, value: 20, unit: "" };
    expect(() => crop.apply(p, m, s)).toThrow(Error);
  });
});
