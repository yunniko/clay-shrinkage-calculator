# Handover — clay-shrinkage-calculator
Last verified: 2026-09-12 at cea56cc

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

svc-lab service #4, the first built by the automation loop (shadow trial). Goal: `GOALS.md`
G-001. Shared conventions: `E:\CLAUDE\projects\svc-lab\`; charter: `E:\CLAUDE\COMPANY\`.

## Current state

- **Live** at https://clay-shrinkage-calculator.svc.julienika.cz (deployed 2026-09-07,
  port 30080; HTTP 200 re-checked 2026-09-12). AdSense auto-ads script added at deploy time.
- Four tools, no database: shrinkage percentage, fired-size prediction, required wet size, and a
  sourced shrinkage-by-clay-type reference.
- Verification on 2026-09-12: `npm run test:unit` 18/18. e2e last green 2026-09-08.
- Domain-expert review done 2026-09-08 (D007). Git tree clean.

## How things fit together

- `lib/shrinkage.ts`: `shrinkagePercent`, `predictFiredSize`, `requiredWetSize`, all
  rearrangements of `fired = wet × (1 − s/100)`, round-trip tested.
- `lib/clay-shrinkage-reference.ts`: sourced data with confidence markers.
- One form per tool in `app/_components/`, one page per route with its own FAQ.

## Rules in force

- The chart is total wet-to-fired shrinkage; never mix in dry-to-fired figures (D002).
- "Wet" means freshly formed, never "greenware" (D007).
- No unit selector by design (D004). Inputs validated per D003.
- `npm ci --legacy-peer-deps`; run unit, e2e and `npm run build` before calling work done.

## Next steps and open questions

- Optional fifth tool (batch/scale multiplier for several target sizes) if traffic justifies it.
- AdSense per-domain approval unconfirmed (portfolio-wide).

## Deploy log

| Date | Commit | What changed | Verified how |
|---|---|---|---|
| 2026-09-07 | (interactive session) | First deploy after the shared deploy-script fix (D006) | Live HTTPS, sibling sites unaffected |
| 2026-09-08 | cea56cc | Domain-review fixes (D007) redeployed | Routes curl 200 |

## Decisions

`docs/decisions/README.md` (D001–D007).
