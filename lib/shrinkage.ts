// Core relationship: fired size = wet size × (1 - shrinkage% / 100).
// This is standard ceramics math (see lib/clay-shrinkage-reference.ts for
// the sourced typical-range data); the formula itself is a direct
// definition of "percent shrinkage," not something requiring a citation —
// verified by the round-trip test in tests/unit/shrinkage.spec.ts.

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

/** Percent shrinkage between a wet (or greenware) measurement and the fired measurement of the same piece. */
export function shrinkagePercent(wetSize: number, firedSize: number): number {
  assertPositive(wetSize, "Wet (greenware) size");
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
  assertPositive(wetSize, "Wet (greenware) size");
  assertValidShrinkagePercent(shrinkagePct);
  return wetSize * (1 - shrinkagePct / 100);
}

/** Back-solves the wet (greenware) size needed to hit a target fired size, given a known shrinkage percent. */
export function requiredWetSize(targetFiredSize: number, shrinkagePct: number): number {
  assertPositive(targetFiredSize, "Target fired size");
  assertValidShrinkagePercent(shrinkagePct);
  return targetFiredSize / (1 - shrinkagePct / 100);
}
