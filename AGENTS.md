<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# clay-shrinkage-calculator — project conventions

Read `HANDOVER.md` first: current state, decision record (especially D2's
total-vs-dry-to-fired shrinkage distinction and D3's input validation),
next steps. Goal in `GOALS.md` (G-001). Parent initiative in
`E:\CLAUDE\projects\svc-lab\`; company-wide standards in
`E:\CLAUDE\COMPANY\`.

- Stack: Next.js App Router, TypeScript, Tailwind. No database, no auth,
  no accounts.
- `lib/shrinkage.ts` is the one non-trivial module — don't change its
  formulas without re-reading HANDOVER D3 and re-running
  `tests/unit/shrinkage.spec.ts`'s round-trip check.
- `lib/clay-shrinkage-reference.ts` is sourced and cited in a header
  comment, with a confidence marker where sources disagree (see
  HANDOVER D1/D2). Don't change a number without re-checking it against a
  real source; this is a public-facing reference tool, and a wrong
  shrinkage figure can waste someone's clay or ruin a fitted piece.
- No unit dropdown by design (HANDOVER D4) — shrinkage math is
  unit-agnostic as long as both inputs to a calculation use the same
  unit.
- `npm install`/`npm ci` need `--legacy-peer-deps` (a live npm/arborist
  bug, not specific to this project — see `svc-lab/HANDOVER.md`).
- Two test layers: `npx vitest run` (unit — hand-verified shrinkage
  numbers and reference-data invariants) and `npx playwright test` (e2e —
  real browser flows). Both must pass before calling a change done; also
  run `npm run build` — it catches server/client boundary bugs that
  `next dev`, ESLint, and TypeScript don't (see
  `yarn-gauge-converter/HANDOVER.md` D1 for a real example from a sibling
  project).
- See `E:\CLAUDE\COMPANY\INFRASTRUCTURE_DEPLOY.md` for the redeploy
  command once live.
