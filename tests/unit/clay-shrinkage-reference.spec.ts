import { describe, expect, it } from "vitest";
import { CLAY_SHRINKAGE_REFERENCE } from "@/lib/clay-shrinkage-reference";

describe("CLAY_SHRINKAGE_REFERENCE", () => {
  it("has a sane min <= max range within 0-100 for every clay type", () => {
    for (const entry of CLAY_SHRINKAGE_REFERENCE) {
      expect(entry.totalShrinkageMinPercent).toBeLessThanOrEqual(
        entry.totalShrinkageMaxPercent
      );
      expect(entry.totalShrinkageMinPercent).toBeGreaterThan(0);
      expect(entry.totalShrinkageMaxPercent).toBeLessThan(100);
    }
  });

  it("covers earthenware, stoneware, and porcelain", () => {
    const types = CLAY_SHRINKAGE_REFERENCE.map((c) => c.clayType.toLowerCase());
    expect(types.some((t) => t.includes("earthenware"))).toBe(true);
    expect(types.some((t) => t.includes("stoneware"))).toBe(true);
    expect(types.some((t) => t.includes("porcelain"))).toBe(true);
  });
});
