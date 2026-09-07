# Handover — clay-shrinkage-calculator

Read this before touching the project. Goal in `GOALS.md` (G-001).
Parent initiative: `E:\CLAUDE\projects\svc-lab\`. Company-wide standards
in `E:\CLAUDE\COMPANY\`.

## Current state

**Live at https://clay-shrinkage-calculator.svc.julienika.cz** (deployed
2026-09-07). Built by the svc-lab automation loop's shadow trial (four
tools, no database); the deploy step failed on that run due to a bug in
the shared `deploy-service.ps1` script (see D6), fixed and re-verified
the same day by an interactive session using this exact build. The
AdSense auto-ads script was also added at that point (the automated
build predated its rollout to the shared template). See the automated
run's own log at `svc-lab/run-logs/run-2026-09-07T124931Z.md` for the
original build/test verification output.

## How things fit together

- `lib/shrinkage.ts` — the one real calculation: `shrinkagePercent`,
  `predictFiredSize`, `requiredWetSize`. All three are direct algebraic
  rearrangements of `fired = wet × (1 - shrinkage%/100)` — not something
  requiring an external source, verified instead by a round-trip test
  (`requiredWetSize(predictFiredSize(w, p), p) ≈ w`).
- `lib/clay-shrinkage-reference.ts` — static reference data (typical total
  wet-to-fired shrinkage % by clay type), sourced and cited in the file's
  header comment, following the confidence-marking pattern from
  `yarn-gauge-converter/HANDOVER.md` D2.
- Each tool has its own client-component form (`app/_components/*-form.tsx`)
  and its own route/page with distinct metadata and FAQ content, matching
  the pattern in `sourdough-calculator` and `fraction-calculator`.

## Decision record

**D1 — Sourcing done via WebSearch synthesis, not direct WebFetch, because
WebFetch was denied for this unattended automation run.** The svc-lab
daily-build automation runs with no interactive approval surface; a tool
call requiring manual approval (as WebFetch apparently does in this
session) is auto-denied with no way to retry. Fell back to WebSearch,
which returned directly quoted/paraphrased figures with attribution
(Digitalfire's "Firing Shrinkage"/"Drying Shrinkage" glossary entries,
plus The Pottery Wheel and Austin Gallery's reference chart as
corroborating secondary sources) — a real, named, checkable primary
source, just not independently re-verified by reading the full page
directly. If a future session has WebFetch available, re-verifying these
figures directly against digitalfire.com would strengthen the citation
from "search-synthesis quoted" to "directly read."

**D2 — Reference chart shows TOTAL wet-to-fired shrinkage, and explicitly
warns against conflating it with dry-to-fired-only figures.** Digitalfire
publishes dry-to-fired shrinkage as a separate, smaller number
(different starting point) from the total wet-to-fired figure a potter
actually needs to plan a piece's greenware size. Conflating the two would
produce a wet-size prediction smaller than reality — a real correctness
risk for someone using this to size a lid or a replacement piece. Both
`lib/clay-shrinkage-reference.ts`'s header comment and the
`/clay-shrinkage-reference` page's FAQ call this out explicitly rather
than only documenting it internally.

**D3 — Shrinkage percent inputs are validated to `[0, 100)`, and
`shrinkagePercent()` itself rejects a fired size larger than the wet
size.** A shrinkage percent of exactly 100 or above would divide by zero
or go negative in `requiredWetSize` — mathematically nonsensical for a
material that shrinks. A fired size larger than the wet size going into
`shrinkagePercent()` is physically implausible for the intended use
(shrinkage measurement, not warping/glaze-bloat edge cases) and almost
certainly means the user swapped the two inputs — worth a clear error
rather than silently returning a negative "shrinkage."

**D4 — No unit dropdown; inputs are unit-agnostic by design, same
reasoning as `yarn-gauge-converter`'s gauge calculator (HANDOVER D4).**
Shrinkage percent and the wet/fired-size relationships are pure ratios —
inches, cm, and mm all produce the same answer as long as both fields in
a given calculation use the same unit. Adding a unit selector would be
UI complexity with no effect on the math; a hint line under each form
says so instead.

**D5 — Project named `clay-shrinkage-calculator`, not `kiln-shrinkage-
calculator` (the backlog idea's original title in `svc-lab/GOALS.md`).**
"Kiln shrinkage" describes the firing device, not the phenomenon; actual
searchers and the closest existing competitor tool (ClayCalc's
"shrinkage calculator") use "clay shrinkage" — matching that phrasing is
better for the search terms this needs to rank for.

**D6 — Deploy was blocked on a bug in `svc-lab/automation/scripts/
deploy-service.ps1`, not on anything in this project — now fixed.** See
`GOALS.md`'s progress log for the full original diagnosis (this
project's own automated run correctly root-caused it): its
port-freeness check piped through `grep -c`, which exits 1 when the
count is 0 (the port-is-free case), and the script's remote-command
runner threw on any non-zero exit — so the check failed whether the
port was free or occupied. Fixed same-day in
`svc-lab/automation/scripts/deploy-service.ps1` (see
`svc-lab/automation/HANDOVER.md` D9) and re-verified by deploying this
exact build through the corrected script — succeeded cleanly on the
first attempt.

## Owner action list

- Monetization not yet live — blocked on the Owner (see
  `svc-lab/HANDOVER.md`'s Owner action list, same as every other
  svc-lab service).

## Next steps and open questions

- If a future session has working WebFetch, re-verify the
  `lib/clay-shrinkage-reference.ts` figures by reading the Digitalfire
  pages directly (see D1) rather than relying on search-result synthesis.
- Consider a fifth tool (e.g. a batch/scale-multiplier calculator for
  sculptors making the same form at several target sizes) as a follow-up
  if this service's traffic justifies more investment — not built now to
  keep the build to a single day, same reasoning as
  `yarn-gauge-converter/HANDOVER.md` D5.
