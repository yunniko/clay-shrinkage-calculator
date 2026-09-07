// Typical TOTAL (wet-to-fired) shrinkage ranges for common clay body types.
//
// Sources: Digitalfire's "Firing Shrinkage" and "Drying Shrinkage" glossary
// entries (digitalfire.com/glossary/firing+shrinkage,
// digitalfire.com/glossary/drying+shrinkage — Digitalfire is Tony Hansen's
// widely-used ceramics technical reference), corroborated against The
// Pottery Wheel ("Does Clay Shrink When Fired?", thepotterywheel.com) and
// Austin Gallery's clay shrinkage & absorption reference chart
// (austingallery.org/blog/clay-shrinkage-and-absorption-rates). Retrieved
// 2026-09-07 via search-result synthesis (direct page fetch was unavailable
// in this environment, so these are quoted/paraphrased figures rather than
// a full read of each source page).
//
// Digitalfire separately gives DRY-to-fired shrinkage alone (a different,
// smaller stage than the TOTAL wet-to-fired figures below): roughly 3-4%
// or less for earthenware, ~5-6% for stoneware, 7-8% for whiteware, and
// over 10% for vitreous porcelain. Don't add that to the total below —
// it's already included.
//
// Every real clay body varies by manufacturer, particle size, and firing
// temperature. Treat these ranges as a starting estimate for planning, not
// a substitute for your specific clay's data sheet or your own fired test
// bar — see the FAQ on /clay-shrinkage-reference.

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
    totalShrinkageMinPercent: 5,
    totalShrinkageMaxPercent: 8,
    confidence: "typical",
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
