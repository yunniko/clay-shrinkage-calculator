# clay-shrinkage-calculator

> **SUSPENDED (Owner, 2026-09-27)** — part of the svc-lab family, suspended because it did not work out as expected.
> No new work; security upkeep only while anything of it is live. Treat its code, formulas and
> decisions as a **lower-reliability reference**: they may or may not still work, so re-verify before
> reusing anything. Rules: `E:\CLAUDE\COMPANY\GOALS.md` → "Suspended projects".

Four tools for potters and ceramicists: a clay shrinkage percentage
calculator (from a wet/fired test measurement), a predicted-fired-size
calculator, a target-wet-size calculator (work backwards from a desired
fired size), and a sourced reference chart of typical shrinkage ranges by
clay type. Part of the `svc-lab` portfolio (see `E:\CLAUDE\projects\svc-lab\`).

## Running it

```
npm install --legacy-peer-deps
npm run dev
```

Production build/run: `docker compose --profile app up -d --build`
(no database — stateless).

## Tests

```
npx vitest run        # unit tests — lib/*.ts shrinkage math and reference data
npx playwright test   # e2e — real browser flows for all four tools
```

## Current state

Live at https://clay-shrinkage-calculator.svc.julienika.cz (deployed
2026-09-07). See `HANDOVER.md` for the shrinkage math and sourcing
notes, `GOALS.md` for the full deploy history.
