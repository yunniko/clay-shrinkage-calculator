// Core relationship: fired size = wet size × (1 - shrinkage% / 100).
// This is standard ceramics math (see lib/clay-shrinkage-reference.ts for
// the sourced typical-range data); the formula itself is a direct
// definition of "percent shrinkage," not something requiring a citation —
// verified by the round-trip test in tests/unit/shrinkage.spec.ts. A
// domain-expert review (2026-09-08, see docs/domain-reference.md)
// confirmed this endpoint model needs no correction: drying and firing are
// each non-linear in time/temperature, but since this only maps wet->fired
// endpoints and never models the path between them, that non-linearity
// doesn't affect it.
//
// "Wet" means freshly-formed/plastic, NOT "greenware" -- greenware
// colloquially means the bone-dry unfired piece, a later stage. Measuring
// a bone-dry piece and calling it "wet" here overstates the shrinkage
// already spent by the time of measurement, making a fired-size
// prediction come out too small. This distinction matters enough that an
// earlier version of this code's own field labels offered "greenware" as
// a synonym for "wet," which the 2026-09-08 review flagged as the exact
// mistake this tool exists to prevent someone from making.
//
// Two more real caveats, per that review: (1) this assumes shrinkage is
// the same in every direction (isotropic) -- true for randomly-oriented
// clay platelets, which is the normal case for hand-thrown/hand-built
// ware, but not for heavily extruded or robocast forms where particle
// alignment can make shrinkage direction-dependent; (2) this is LINEAR
// shrinkage -- a piece sized by volume (e.g. "will this hold 16oz?")
// shrinks by roughly 3x the linear percentage in volume (11% linear is
// roughly 30% less volume), not the same percentage.

export class ShrinkageError extends Error {}

function assertPositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new ShrinkageError(`${label} must be a positive number.`);
  }
}

function assertValidShrinkagePercent(pct: number): void {
  if (!Number.isFinite(pct) || pct < 0 || pct >= 100) {
    throw new ShrinkageError(
      "Shrinkage percent must be 0 or greater, and less than 100."
    );
  }
}

/** Percent shrinkage between a wet, freshly-formed measurement and the fired measurement of the same piece. */
export function shrinkagePercent(wetSize: number, firedSize: number): number {
  assertPositive(wetSize, "Wet size");
  assertPositive(firedSize, "Fired size");
  if (firedSize > wetSize) {
    throw new ShrinkageError(
      "Fired size can't be larger than the wet size — clay shrinks as it dries and fires."
    );
  }
  return ((wetSize - firedSize) / wetSize) * 100;
}

/** Predicts the fired size of a piece given its wet size and a known shrinkage percent. */
export function predictFiredSize(wetSize: number, shrinkagePct: number): number {
  assertPositive(wetSize, "Wet size");
  assertValidShrinkagePercent(shrinkagePct);
  return wetSize * (1 - shrinkagePct / 100);
}

/** Back-solves the wet, freshly-formed size needed to hit a target fired size, given a known shrinkage percent. */
export function requiredWetSize(targetFiredSize: number, shrinkagePct: number): number {
  assertPositive(targetFiredSize, "Target fired size");
  assertValidShrinkagePercent(shrinkagePct);
  return targetFiredSize / (1 - shrinkagePct / 100);
}
