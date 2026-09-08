// Typical TOTAL (wet-to-fired) shrinkage ranges for common clay body types.
//
// Sources: Digitalfire's "Firing Shrinkage" and "Drying Shrinkage" glossary
// entries (digitalfire.com/glossary/firing+shrinkage,
// digitalfire.com/glossary/drying+shrinkage — Digitalfire is Tony Hansen's
// widely-used ceramics technical reference) plus its "Terra Cotta" and SHAB
// test pages, all independently re-read directly (not search-synthesized)
// by a domain-expert review 2026-09-08 -- see docs/domain-reference.md.
// Corroborated against real manufacturer data sheets (Plainsman Clays'
// M340 stoneware, Polar Ice and P700 porcelains, L210 terra cotta -- these
// specific figures came from search snippets of plainsmanclays.com, which
// 404s to direct fetch, so are medium- not high-confidence individually,
// but the review's composed totals from them are internally consistent
// with Digitalfire's own worked example, see below).
//
// Digitalfire separately gives DRY-to-fired shrinkage alone (a different,
// smaller stage than the TOTAL wet-to-fired figures below): roughly 3-4%
// or less for earthenware, ~5-6% for stoneware, 7-8% for whiteware, and
// over 10% for vitreous porcelain. Don't add that to the total below --
// it's already included. IMPORTANT (corrected 2026-09-08): the two stages
// are measured on DIFFERENT base lengths (drying % against the wet length,
// firing % against the DRY length), so the true total is NOT simply
// dry% + fired% -- it's `total = dry% + fired% - (dry% x fired% / 100)`.
// Digitalfire's own worked example proves this: "6.25 dry + 6.66 fired =
// 12.9, whereas the actual total shrinkage is 12.5%" -- naive addition
// overstates the total. The app's own /clay-shrinkage-reference FAQ now
// states this formula explicitly instead of just saying "use the combined
// total."
//
// Every real clay body varies by manufacturer, particle size, and firing
// temperature (cone) -- firing shrinkage specifically rises with more heat
// work within the same body. Treat these ranges as a starting estimate for
// planning, not a substitute for your specific clay's data sheet or your
// own fired test bar -- see the FAQ on /clay-shrinkage-reference.

export interface ClayShrinkageRange {
  clayType: string;
  totalShrinkageMinPercent: number;
  totalShrinkageMaxPercent: number;
  confidence: "typical" | "approximate";
  note?: string;
}

export const CLAY_SHRINKAGE_REFERENCE: ClayShrinkageRange[] = [
  {
    clayType: "Earthenware",
    totalShrinkageMinPercent: 6,
    totalShrinkageMaxPercent: 11,
    confidence: "approximate",
    note: "Wide range because 'earthenware' spans very different bodies -- talc-based low-fire white clays sit near the low end (e.g. ~6%), plastic terra cotta bodies run notably higher (composed Digitalfire/manufacturer figures land ~9-11%, above what this range said before a 2026-09-08 correction). Check your specific body, especially for terra cotta.",
  },
  {
    clayType: "Stoneware (mid-fire, e.g. cone 5–6)",
    totalShrinkageMinPercent: 10,
    totalShrinkageMaxPercent: 13,
    confidence: "typical",
    note: "Heavily grogged or sculpture-grade stoneware bodies often shrink less, closer to 8–11%.",
  },
  {
    clayType: "Porcelain",
    totalShrinkageMinPercent: 12,
    totalShrinkageMaxPercent: 16,
    confidence: "approximate",
    note: "Porcelain bodies vary more between manufacturers than stoneware/earthenware — check your specific body's data sheet.",
  },
];
