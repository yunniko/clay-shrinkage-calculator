"use client";

import { useMemo, useState } from "react";
import { requiredWetSize, ShrinkageError } from "@/lib/shrinkage";

function round(n: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function TargetWetSizeForm() {
  const [targetFiredSize, setTargetFiredSize] = useState("8.8");
  const [shrinkage, setShrinkage] = useState("12");

  const result = useMemo(() => {
    try {
      const wetSize = requiredWetSize(Number(targetFiredSize), Number(shrinkage));
      return { error: null as string | null, wetSize };
    } catch (e) {
      return {
        error: e instanceof ShrinkageError ? e.message : "Invalid input.",
        wetSize: null,
      };
    }
  }, [targetFiredSize, shrinkage]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h3 className="font-medium">Target fired size and known shrinkage rate</h3>
      <p className="mt-1 text-sm text-gray-600">
        Don&rsquo;t know your clay&rsquo;s shrinkage rate? Check the{" "}
        <a href="/clay-shrinkage-reference" className="text-blue-600 hover:underline">
          typical ranges by clay type
        </a>{" "}
        or your manufacturer&rsquo;s data sheet.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Target fired size</span>
          <input
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={targetFiredSize}
            onChange={(e) => setTargetFiredSize(e.target.value)}
            aria-label="Target fired size"
            inputMode="decimal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Shrinkage (%)</span>
          <input
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={shrinkage}
            onChange={(e) => setShrinkage(e.target.value)}
            aria-label="Known shrinkage percent"
            inputMode="decimal"
          />
        </label>
      </div>
      <div className="mt-4" data-testid="result">
        {result.error ? (
          <p className="text-red-600" role="alert">
            {result.error}
          </p>
        ) : (
          <p className="text-lg">
            Make it: <span className="font-semibold">{round(result.wetSize!)}</span> wet
          </p>
        )}
      </div>
    </div>
  );
}
