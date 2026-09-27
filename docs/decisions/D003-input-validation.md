# D003 · Shrinkage percent validated to [0, 100); fired size larger than wet size rejected
Date: 2026-09-07 · Goal: G-001 · Status: active
Context: 100%+ divides by zero or goes negative in `requiredWetSize`; fired > wet almost certainly means swapped inputs.
Decision: Reject both with clear errors instead of returning nonsense.
Rejected: silently computing a negative shrinkage.
Consequence: All three functions are algebraic rearrangements of `fired = wet × (1 − s/100)`, verified by a round-trip test.
Evidence: `lib/shrinkage.ts`; `tests/unit/shrinkage.spec.ts`.
