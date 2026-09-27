# D006 · First deploy was blocked by a bug in the shared deploy script, not this project
Date: 2026-09-07 · Goal: G-001 · Status: active
Context: `deploy-service.ps1`'s port-freeness check piped through `grep -c`, which exits 1 when the count is 0 (the port-is-free case); the remote runner threw on any non-zero exit.
Decision: Fixed same day in `svc-lab/automation/scripts/deploy-service.ps1`; this exact build redeployed cleanly through the corrected script.
Rejected: —
Consequence: See `svc-lab/automation/HANDOVER.md` D9.
Evidence: `GOALS.md` progress log 2026-09-07.
