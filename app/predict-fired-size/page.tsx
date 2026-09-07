import type { Metadata } from "next";
import Link from "next/link";
import { PredictFiredSizeForm } from "@/app/_components/predict-fired-size-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Predict Fired Size From Wet Clay",
  description:
    "Enter a wet (greenware) size and your clay's shrinkage percentage to predict the finished fired size of a pottery piece.",
};

const FAQ = [
  {
    question: "Where do I get my clay's shrinkage percentage?",
    answer:
      "Check your clay manufacturer's data sheet (most publish a shrinkage % at their recommended cone), or measure it yourself with the shrinkage percentage calculator using a fired test tile. The reference chart has typical ranges by clay type if you don't have an exact number yet.",
  },
  {
    question: "Does this account for both drying and firing shrinkage?",
    answer:
      "Yes, as long as the shrinkage percentage you enter is a total wet-to-fired figure (which is what's usually meant by \"clay shrinkage %\" and what test tiles measure directly). Some data sheets separate drying and firing shrinkage into two numbers — if so, use the combined wet-to-fired total, not either stage alone.",
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

      <h1 className="text-3xl font-semibold">Predict Fired Size From Wet Clay</h1>
      <p className="mt-3 text-gray-600">
        Know your clay&rsquo;s shrinkage rate? Enter a wet size to see what
        it&rsquo;ll measure once fired.
      </p>

      <div className="mt-6">
        <PredictFiredSizeForm />
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
