# Goals — clay-shrinkage-calculator

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (same milestone-gate waiver
and standing deploy pre-approval apply here). Template/numbering
conventions in `E:\CLAUDE\COMPANY\GOALS.md`.

## Active goals

### G-001 · Clay shrinkage calculators — ACTIVE
- **What:** Four tools at `clay-shrinkage.svc.julienika.cz` (or the
  assigned subdomain — see GOALS progress log for the confirmed one): a
  shrinkage percentage calculator (`/shrinkage-percentage`), a
  predict-fired-size calculator (`/predict-fired-size`), a target-wet-size
  calculator (`/target-wet-size`), and a sourced reference chart
  (`/clay-shrinkage-reference`). No database, no accounts.
- **Why:** svc-lab idea #3 — near-zero existing coverage per the original
  research pass's competitor-gap reasoning, and the underlying math (plan
  a piece's wet size to hit a fired-size target) is exactly the kind of
  fiddly-but-mechanical task people search a calculator for rather than
  doing by hand.
- **Acceptance criteria:** All four tools compute correctly (unit-tested
  against hand-derived numbers), a real browser flow verified (e2e-tested),
  live and reachable over HTTPS, sitemap present, reference chart's
  figures carry real citations.
- **Constraints:** No database, no accounts, no paid dependencies.

**Milestones:**
- [x] M1 — Build: shrinkage math library (percent-from-measurements,
      predict-fired-size, required-wet-size — derived directly and
      verified with a round-trip test), sourced clay-type reference table
      (Digitalfire + corroborating sources, confidence-marked), 4 tool
      pages, unit tests, e2e tests. Verified locally (`npm run build`,
      `npx vitest run`, `npx playwright test`, `npx eslint .`).
- [ ] M2 — Deploy: git repo, pushed, cloned to VPS, `docker compose
      --profile app up` on its assigned port, `julai-new-vhost` run,
      verified live over HTTPS.
- [ ] M3 — Monetization once an ad/payment account exists (blocked on
      Owner, same as the other svc-lab services).

**Progress log** (newest first):
- 2026-09-07 — M1 in progress/complete this run — see this run's log in
  `svc-lab/automation/logs/` for the exact verification output. Sourcing
  note: research done via WebSearch synthesis (WebFetch was denied for
  this unattended session — see `svc-lab/HANDOVER.md` for why), citing
  Digitalfire's ceramics glossary plus two corroborating published
  sources; figures are ranges with confidence markers, not treated as
  precise universal constants — see `lib/clay-shrinkage-reference.ts`'s
  header comment for the full citation and the explicit dry-vs-fired
  distinction.
