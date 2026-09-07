# Goals — clay-shrinkage-calculator

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (same milestone-gate waiver
and standing deploy pre-approval apply here). Template/numbering
conventions in `E:\CLAUDE\COMPANY\GOALS.md`.

## Active goals

### G-001 · Clay shrinkage calculators — ACTIVE
- **What:** Four tools at `clay-shrinkage-calculator.svc.julienika.cz`
  (repo: https://github.com/yunniko/clay-shrinkage-calculator, public,
  pushed): a shrinkage percentage calculator (`/shrinkage-percentage`), a
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
- [x] M1b — Ship: git repo created and pushed (public,
      `yunniko/clay-shrinkage-calculator`) via `init-repo.ps1`. ✔ 2026-09-07.
- [x] M2 — Deploy: the blocking bug (see progress log) was fixed and
      re-verified the same day by an interactive session — the fixed
      `deploy-service.ps1` deployed this exact build cleanly end to end
      on the first real attempt: vhost, TLS, log directory, and live
      HTTPS all verified. Live at
      https://clay-shrinkage-calculator.svc.julienika.cz. Also added the
      AdSense auto-ads script (not present in the automated run's
      original build, since that predated the ad-script rollout to the
      template) before this deploy. ✔ 2026-09-07.
- [ ] M3 — Monetization once an ad/payment account exists (blocked on
      Owner, same as the other svc-lab services).

**Progress log** (newest first):
- 2026-09-07 — Deployed. The `deploy-service.ps1` bug diagnosed below
  was fixed by an interactive session the same day (see
  `svc-lab/automation/HANDOVER.md` D9) and re-verified by deploying this
  exact service through the fixed script — succeeded cleanly on the
  first attempt. Live at
  https://clay-shrinkage-calculator.svc.julienika.cz.
- 2026-09-07 — PENDING APPROVAL: `deploy-service.ps1` needs a fix before
  any svc-lab automation run can deploy anything — logged 2026-09-07.
  Attempted deploy: `deploy-service.ps1 -Name clay-shrinkage-calculator
  -Port 30080 -Domain clay-shrinkage-calculator.svc.julienika.cz` (first
  attempt used a shorter domain and correctly got refused by the
  name/domain-match sanity check — that check is working as intended).
  Second attempt failed with: `Remote command failed (exit 1): ss -tlnp
  | grep -c ':30080 '`. Root cause: `grep -c` follows standard grep exit
  conventions — exit 1 when the count is 0 (i.e. exactly when the port
  IS free, the desired/common case), exit 0 when count >= 1 (port
  occupied). `Invoke-Remote` (deploy-service.ps1:46-52) throws on any
  non-zero exit code. Net effect: the very first step of the script
  throws in BOTH cases — a free port throws "Remote command failed", an
  occupied port passes that layer but then correctly throws "port
  already in use" one line later. **This port check can never succeed as
  written; no service can be deployed by this script until it's fixed.**
  Suggested fix (for an interactive session — this automation run is
  deny-listed from editing `svc-lab/automation/**`): change line 55 from
  `"ss -tlnp | grep -c ':$Port '"` to `"ss -tlnp | grep -c ':$Port ' ||
  true"` so the remote command always exits 0 and the script's own
  existing check on the returned count (line 56) does the real work.
  Port 30080 was NOT actually claimed on the host (the script failed
  before reaching the clone/build step) — no COMPANY doc reconciliation
  needed for this attempt. The GitHub repo (M1b) is real and public;
  only the VPS deploy is blocked. Not marking this idea "Shipped" in
  `svc-lab/GOALS.md`'s backlog — it's built and pushed, not live.
- 2026-09-07 — M1 complete this run — see this run's log in
  `svc-lab/run-logs/` for the exact verification output (not
  `svc-lab/automation/logs/` as the runbook specifies — that path is
  denied for this automation's Write access; see the log file itself
  for the note). Sourcing
  note: research done via WebSearch synthesis (WebFetch was denied for
  this unattended session — see `svc-lab/HANDOVER.md` for why), citing
  Digitalfire's ceramics glossary plus two corroborating published
  sources; figures are ranges with confidence markers, not treated as
  precise universal constants — see `lib/clay-shrinkage-reference.ts`'s
  header comment for the full citation and the explicit dry-vs-fired
  distinction.
