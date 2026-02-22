# HEARTBEAT.md

## Product Build Loop (Lean, Safe)

On heartbeat, run this loop once and report briefly.
Quick start: `make heartbeat-help` (command reference: `docs/heartbeat.md`).

Quick command (local state update/check):
- `make heartbeat-cycle` (runs check → touch)
- `make heartbeat-check`
- `make heartbeat-touch`
(Equivalent raw script commands still work.)

1) Build only **ONE atomic feature** per cycle.
2) If build is done, propose **ONE next experiment** with:
   - success metric
   - estimated time/cost
3) If real metrics are unavailable, run **proxy validation**:
   - landing page CTR, waitlist conversion, or user interview signal
   - mark confidence as LOW
4) If no high-value action exists, do one small internal task:
   - docs cleanup, refactor, test hardening, backlog pruning
   - then stop (no busywork loop)
5) Never auto-execute external actions without approval:
   - publishing, outreach, paid spend, public posting, bulk messaging

Output format:
- Done:
- Next:
- Metric:
- Confidence:
- Blocker/Ask:

## OpenClaw Insight Briefing (new)

When relevant updates/cases are available, include a short "Apply Briefing" with up to 3 candidates:
- Candidate
- Expected upside
- Risk
- Time to apply
- Rollback
- Recommendation (apply/hold/skip)

Always finish with approval trigger:
"적용할까요? (1번 / 1+3번 / 전부 / 보류)"

Never apply config changes, updates, or external actions without explicit approval.
