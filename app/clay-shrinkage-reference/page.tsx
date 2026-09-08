import type { Metadata } from "next";
import Link from "next/link";
import { CLAY_SHRINKAGE_REFERENCE } from "@/lib/clay-shrinkage-reference";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Clay Shrinkage Reference Chart by Type",
  description:
    "Typical total (wet-to-fired) shrinkage percentage ranges for earthenware, stoneware, and porcelain, sourced from published ceramics references.",
};

const FAQ = [
  {
    question: "Are these exact numbers for my clay?",
    answer:
      "No — treat them as a starting estimate for planning. Real shrinkage varies by manufacturer, specific clay body, and firing temperature. For anything where the final size matters, fire a test tile and use the shrinkage percentage calculator to get your exact number.",
  },
  {
    question: "Why is porcelain marked \"approximate\" instead of \"typical\"?",
    answer:
      "Porcelain bodies vary more between manufacturers than stoneware or earthenware do, so published ranges disagree more for porcelain — the range shown is wider and less certain as a result.",
  },
  {
    question: "What's the difference between drying shrinkage and firing shrinkage?",
    answer:
      "Drying shrinkage happens as water leaves the clay between wet and bone-dry; firing shrinkage happens separately as the clay vitrifies in the kiln. The ranges in this chart are the TOTAL of both stages, from wet to fired — don't add a separately-published drying or firing figure to them (they're measured against different base lengths, so simple addition overstates it — see the predict-fired-size calculator's FAQ for the actual formula).",
  },
  {
    question: "Does firing temperature (cone) change these numbers?",
    answer:
      "Yes, within the same clay body — firing shrinkage generally increases with more heat work. These ranges are broad enough to cover a body's typical firing range, but a body pushed to a notably higher cone than usual (or a reduction-fired vs. oxidation-fired version of the same clay) can shift outside this range. Check your specific body's data sheet for the cone you're actually using.",
  },
  {
    question: "Does this apply to slip casting?",
    answer:
      "Not directly — these figures (and this whole toolset) assume plastic forming (throwing, hand-building), where you measure a wet, freshly-formed piece. Slip casting starts from a liquid poured into a mold, and mold sizing is a related but different calculation (see ASTM C326 if you need the formal method) — don't plug a mold cavity dimension in as a \"wet size\" here.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Clay Shrinkage Reference Chart</h1>
      <p className="mt-3 text-gray-600">
        Typical total shrinkage (wet clay to fired ware) by clay body type.
      </p>

      <table className="mt-6 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 pr-4">Clay type</th>
            <th className="py-2 pr-4">Total shrinkage</th>
            <th className="py-2">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {CLAY_SHRINKAGE_REFERENCE.map((entry) => (
            <tr key={entry.clayType} className="border-b border-gray-100 align-top">
              <td className="py-2 pr-4 font-medium">{entry.clayType}</td>
              <td className="py-2 pr-4">
                {entry.totalShrinkageMinPercent}–{entry.totalShrinkageMaxPercent}%
              </td>
              <td className="py-2 text-sm text-gray-600">
                {entry.confidence}
                {entry.note && <p className="mt-1">{entry.note}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-sm text-gray-500">
        Sourced from Digitalfire&rsquo;s ceramics glossary (read directly, not
        search-summarized) plus real manufacturer data sheets — see
        <code className="mx-1 rounded bg-gray-100 px-1">
          docs/domain-reference.md
        </code>
        in this project for the full review and citations. Always confirm
        with your own test tile for anything where the final size matters.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
