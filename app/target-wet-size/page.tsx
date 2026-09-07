import type { Metadata } from "next";
import Link from "next/link";
import { TargetWetSizeForm } from "@/app/_components/target-wet-size-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "What Size Should I Make My Pottery Before Firing?",
  description:
    "Work backwards from the fired size you want to the wet (greenware) size you need to make now, using your clay's shrinkage percentage.",
};

const FAQ = [
  {
    question: "Why can't I just make it the size I want?",
    answer:
      "Clay shrinks 5-16% or more between wet and fired, depending on the body — a mug needing to fit a specific lid, a tile meant to match a grid, or a piece replacing a broken original all need to be made oversized by exactly the right amount to land on target after firing.",
  },
  {
    question: "What if I don't know my clay's exact shrinkage percentage?",
    answer:
      "Use the reference chart for a typical range by clay type as a starting estimate, then confirm with a real test tile once you can — see the shrinkage percentage calculator. For anything where the final size really matters (a lid, a fitted piece), always confirm with your own test rather than a published range.",
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

      <h1 className="text-3xl font-semibold">Target Wet Size Calculator</h1>
      <p className="mt-3 text-gray-600">
        Enter the fired size you&rsquo;re aiming for and your clay&rsquo;s
        shrinkage rate to find the size to make it at now.
      </p>

      <div className="mt-6">
        <TargetWetSizeForm />
      </div>

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
