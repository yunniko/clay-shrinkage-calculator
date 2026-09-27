# D001 · Sourcing was WebSearch synthesis for the unattended build; later verified directly by the domain review
Date: 2026-09-07 · Goal: G-001 · Status: active (updated 2026-09-08)
Context: The automation run had no approval surface, so WebFetch was auto-denied; WebSearch returned attributed Digitalfire figures.
Decision: Accept the attributed figures for the build, flag for review. The 2026-09-08 domain review read Digitalfire directly and corrected one range (D007), so this caveat no longer applies to the figures it touched.
Rejected: shipping without a later direct check.
Consequence: `lib/clay-shrinkage-reference.ts` cites its sources in the header with confidence markers.
Evidence: `docs/domain-reference.md`; `svc-lab/run-logs/run-2026-09-07T124931Z.md`.
