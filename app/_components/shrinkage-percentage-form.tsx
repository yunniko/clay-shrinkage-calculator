"use client";

import { useMemo, useState } from "react";
import { ShrinkageError, shrinkagePercent } from "@/lib/shrinkage";

function round(n: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function ShrinkagePercentageForm() {
  const [wetSize, setWetSize] = useState("10");
  const [firedSize, setFiredSize] = useState("8.8");

  const result = useMemo(() => {
    try {
      const pct = shrinkagePercent(Number(wetSize), Number(firedSize));
      return { error: null as string | null, pct };
    } catch (e) {
      return {
        error: e instanceof ShrinkageError ? e.message : "Invalid input.",
        pct: null,
      };
    }
  }, [wetSize, firedSize]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h3 className="font-medium">Measure a wet and fired size</h3>
      <p className="mt-1 text-sm text-gray-600">
        Use the same unit for both (inches, cm, mm — the math doesn&rsquo;t
        care which, only that they match).
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Wet (greenware) size</span>
          <input
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={wetSize}
            onChange={(e) => setWetSize(e.target.value)}
            aria-label="Wet or greenware size"
            inputMode="decimal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Fired size</span>
          <input
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={firedSize}
            onChange={(e) => setFiredSize(e.target.value)}
            aria-label="Fired size"
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
            Shrinkage: <span className="font-semibold">{round(result.pct!, 1)}%</span>
          </p>
        )}
      </div>
    </div>
  );
}
