# HEARTBEAT.md

## Product Build Loop (Lean, Safe)

On heartbeat, run this loop once and report briefly.

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
