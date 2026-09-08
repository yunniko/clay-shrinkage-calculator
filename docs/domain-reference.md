# Domain reference: ceramics clay shrinkage

Reviewed 2026-09-08 by a `domain-expert` subagent per
`COMPANY\STANDARDS.md`'s "Domain depth" guidance. This is the saved
findings summary; see `HANDOVER.md` for what was fixed as a result.
WebFetch worked for this review (unlike the original 2026-09-07 build,
which used search-result synthesis) — Digitalfire's pages were read
directly.

## What real sources say

**The composition law**: Digitalfire measures the two stages on
different base lengths — drying shrinkage = (wet − dry) ÷ wet × 100;
firing shrinkage = (dry − fired) ÷ dry × 100. So total wet-to-fired
`T = drying% + firing% − (drying% × firing% ÷ 100)`, NOT simple
addition. Digitalfire's own worked example proves it: "6.25 dry
shrinkage + 6.66 fired = 12.9 whereas the actual total shrinkage is
12.5%." Checked: 1 − 0.9375 × 0.9334 = 12.49% ✓.

**Digitalfire's dry-to-fired figures** (a different, smaller stage than
this app's total wet-to-fired numbers): earthenware "3-4% or less",
stoneware "about 5-6%", whiteware "7-8%", porcelain "more than 10%".

**Drying shrinkage, plastic bodies**: "a typical plastic pottery clay
shrinks approximately 6%"; up to 7.5% for highly plastic bodies. Water
content at measurement matters a lot: "when water content is high (soft
clay), drying shrinkage can increase very significantly" — a body
normally 6% stiff can be 7%+ soft.

**Terra cotta specifically spans far wider than "earthenware" implies**:
drying shrinkage from 4.5% (low plasticity) to 12% (hyper-plastic);
fired shrinkage "only 2%" at cone 04, "below 6%" at cone 2.

**Real manufacturer data** (Plainsman Clays, composed via the law
above): M340 stoneware (C6) 10.7-12.1%; Polar Ice porcelain (C6)
13.5-15.4%; P700 porcelain (C8) 12.1-13.5%; L210 terra cotta (C04)
8.9-10.8%.

**Isotropy is conditional**: shrinkage is the same in all directions
when clay platelets are randomly oriented (the normal case for
hand-thrown/hand-built ware), but not when forming aligns them —
established for extrusion and tape casting; magnitude for ordinary
wheel-thrown studio ware isn't quantified in any source the review
could find.

**Linear vs. volumetric**: 11% linear shrinkage ≈ 30% volume reduction
(1 − 0.89³ = 29.5%) — a natural and costly misreading for anyone sizing
a piece for capacity rather than a dimension.

**The measurement procedure this app's `/shrinkage-percentage` page
already teaches matches real practice almost verbatim** (a 10cm-marked
test tile, wet to fired) — confirmed against Ceramics Monthly's
"Techno File: Testing Clay Bodies" and Digitalfire's own SHAB test.

## Findings against this project's code (2026-09-08)

| # | Finding | Severity | Fixed? |
|---|---|---|---|
| 1 | Earthenware range (5-8%) contradicted by the code's own cited source when composed correctly (~8.8-9.8% from Digitalfire's own two figures; real terra cotta data 8.9-10.8%) | Real inaccuracy, highest-confidence row | ✅ Fixed (now 6-11%, confidence lowered to approximate) |
| 2 | "Wet (greenware)" field labels — greenware colloquially means bone-dry, not wet; measuring at the wrong stage understates shrinkage spent | Unfounded shortcut, undermines the tool's own stated purpose | ✅ Fixed (relabeled "wet, freshly-formed" everywhere) |
| 3 | "Use the combined total" guidance without the actual formula — naive addition overstates total shrinkage | Missing depth, formula readily available | ✅ Fixed (explicit formula + worked example added) |
| 4 | No mention that water content at measurement affects the result | Missing depth | ✅ Fixed (FAQ added) |
| 5 | No cone/temperature dimension in the reference chart | Reasonable approximation, was unlabeled | ✅ Fixed (FAQ added) |
| 6 | Isotropy assumption correct as default, but unstated | Reasonable approximation | ✅ Fixed (noted in lib/shrinkage.ts) |
| 7 | No warning that linear % ≠ volumetric % | Missing caveat, real stakes for capacity-sized pieces | ✅ Fixed (FAQ added) |
| 8 | Slip casting in scope but unexcluded | Missing scope note | ✅ Fixed (FAQ added) |
| 9 | D1's WebFetch-unavailable caveat was stale by the time of this review | Process finding | ✅ Corrected in HANDOVER.md |
| 10 | Core `fired = wet × (1 - shrinkage%/100)` formula | N/A — confirmed correct, endpoint model needs no path-nonlinearity correction | No change needed |

## Confidence and gaps (from the review)

- High confidence: the composition law, Digitalfire's published figures
  (read directly this pass), the SHAB/Ceramics Monthly procedures, the
  isotropy condition.
- Medium confidence: the Plainsman data sheet numbers — their server
  404s to direct fetch, so these came from search snippets quoting the
  data sheets, not a full page read. The earthenware finding doesn't
  depend on Plainsman alone (Digitalfire's own two figures independently
  support it), so it doesn't collapse if a snippet is slightly off, but
  a human should confirm L210's exact figures on plainsmanclays.com
  directly.
- Thin/unresolved: the magnitude of height-vs-diameter shrinkage
  difference for ordinary wheel-thrown ware (mechanism is established,
  no authoritative number found — not asserted in the app).
- Unresolved: whether Standard Clay's published "Average Shrinkage" for
  its 105 body is wet-to-fired or dry-to-fired — their page doesn't
  state the basis. Not used as a load-bearing figure in this app.
