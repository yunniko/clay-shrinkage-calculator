import { describe, expect, it } from "vitest";
import {
  predictFiredSize,
  requiredWetSize,
  ShrinkageError,
  shrinkagePercent,
} from "@/lib/shrinkage";

describe("shrinkagePercent", () => {
  it("computes a standard 12% shrinkage", () => {
    expect(shrinkagePercent(10, 8.8)).toBeCloseTo(12, 9);
  });

  it("computes 0% when wet and fired sizes match", () => {
    expect(shrinkagePercent(10, 10)).toBe(0);
  });

  it("rejects a fired size larger than the wet size", () => {
    expect(() => shrinkagePercent(10, 11)).toThrow(ShrinkageError);
  });

  it.each([
    [0, 5],
    [-1, 5],
    [10, 0],
    [10, -1],
  ])("rejects non-positive input (%d, %d)", (wet, fired) => {
    expect(() => shrinkagePercent(wet, fired)).toThrow(ShrinkageError);
  });
});

describe("predictFiredSize", () => {
  it("shrinks a wet size by the given percent", () => {
    expect(predictFiredSize(10, 12)).toBeCloseTo(8.8, 9);
  });

  it("returns the same size at 0% shrinkage", () => {
    expect(predictFiredSize(10, 0)).toBe(10);
  });

  it.each([-1, 100, 101])("rejects an invalid shrinkage percent (%d)", (pct) => {
    expect(() => predictFiredSize(10, pct)).toThrow(ShrinkageError);
  });
});

describe("requiredWetSize", () => {
  it("computes the wet size needed for a target fired size", () => {
    expect(requiredWetSize(8.8, 12)).toBeCloseTo(10, 9);
  });

  it("round-trips with predictFiredSize", () => {
    const wetSize = 7.5;
    const pct = 13.4;
    const fired = predictFiredSize(wetSize, pct);
    expect(requiredWetSize(fired, pct)).toBeCloseTo(wetSize, 9);
  });

  it.each([-1, 100])("rejects an invalid shrinkage percent (%d)", (pct) => {
    expect(() => requiredWetSize(8.8, pct)).toThrow(ShrinkageError);
  });
});
