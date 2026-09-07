import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clay Shrinkage Calculators",
  description:
    "Free calculators for potters and ceramicists: clay shrinkage percentage from a test tile, predicted fired size, the wet size needed to hit a target fired size, and typical shrinkage ranges by clay type.",
};

const TOOLS = [
  {
    href: "/shrinkage-percentage",
    title: "Shrinkage percentage calculator",
    description: "Find your clay's shrinkage % from a wet and fired measurement.",
  },
  {
    href: "/predict-fired-size",
    title: "Predict fired size",
    description: "Know your clay's shrinkage rate? See what size it'll be once fired.",
  },
  {
    href: "/target-wet-size",
    title: "Target wet size calculator",
    description: "Work backwards from the fired size you want to the size to make it now.",
  },
  {
    href: "/clay-shrinkage-reference",
    title: "Clay shrinkage reference chart",
    description: "Typical total shrinkage ranges for earthenware, stoneware, and porcelain.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Clay Shrinkage Calculators</h1>
      <p className="mt-3 text-gray-600">
        Free tools for potters and ceramicists to plan for clay shrinkage
        before it fires, not after.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-lg border border-gray-200 p-5 hover:border-gray-400"
          >
            <h2 className="font-semibold text-blue-700">{tool.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
