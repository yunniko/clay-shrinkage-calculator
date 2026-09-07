import type { Metadata } from "next";
import Link from "next/link";
import { ShrinkagePercentageForm } from "@/app/_components/shrinkage-percentage-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Clay Shrinkage Percentage Calculator",
  description:
    "Calculate your clay's shrinkage percentage from a wet (or greenware) measurement and the fired measurement of the same test tile.",
};

const FAQ = [
  {
    question: "How do I measure my clay's shrinkage percentage?",
    answer:
      "Mark a line of a known length (e.g. 10cm) on a test tile while it's wet, then measure that same line after the final firing. Shrinkage % = (wet length − fired length) ÷ wet length × 100.",
  },
  {
    question: "Why test my own clay instead of using a published number?",
    answer:
      "Shrinkage varies by manufacturer, clay body, and firing temperature — even two bags of the same product line can differ slightly. A test tile fired in your own kiln to your own cone is the only truly accurate number for your work. Use the reference chart for planning, and test for anything precise.",
  },
  {
    question: "Does it matter what unit I measure in?",
    answer:
      "No — shrinkage percentage is a ratio, so inches, centimeters, or millimeters all give the same result as long as you use the same unit for both measurements.",
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

      <h1 className="text-3xl font-semibold">Clay Shrinkage Percentage Calculator</h1>
      <p className="mt-3 text-gray-600">
        Measure the same feature on a piece before and after firing to find
        your clay body&rsquo;s actual shrinkage percentage.
      </p>

      <div className="mt-6">
        <ShrinkagePercentageForm />
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
