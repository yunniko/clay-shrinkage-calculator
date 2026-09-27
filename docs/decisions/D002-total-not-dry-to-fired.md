# D002 · The reference chart shows total wet-to-fired shrinkage and warns against dry-to-fired figures
Date: 2026-09-07 · Goal: G-001 · Status: active
Context: Digitalfire publishes dry-to-fired shrinkage separately; conflating it with total predicts a wet size that's too small.
Decision: Chart is total shrinkage; both the lib header and the page FAQ say so. Total composes as `drying% + firing% − drying%×firing%/100` (D007).
Rejected: presenting dry-to-fired numbers as the planning figure.
Consequence: Keep the distinction explicit in every user-facing copy.
Evidence: `lib/clay-shrinkage-reference.ts`; `/clay-shrinkage-reference` FAQ.
