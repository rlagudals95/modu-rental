# Heartbeat Commands

Quick reference for the local heartbeat build-loop helpers.

## Commands

- `make heartbeat-help`  
  Show the full command list.

- `make heartbeat-init`  
  Create `memory/heartbeat-state.json` with default structure if it does not exist.

- `make heartbeat-check`  
  Validate `memory/heartbeat-state.json` structure.

- `make heartbeat-verify`  
  Alias of `heartbeat-check`.

- `make heartbeat-doctor`  
  Run validation and print recovery hints when it fails.

- `make heartbeat-status`  
  Print the latest `lastChecks.build_loop` timestamp (unix + local time).

- `make heartbeat-touch`  
  Update `lastChecks.build_loop` to current unix time.

- `make heartbeat-cycle`  
  Run `heartbeat-check` then `heartbeat-touch`.

- `make heartbeat-selftest`  
  Run `heartbeat-init + heartbeat-verify + heartbeat-status`.

- `make heartbeat-recover`  
  Run safe recovery flow: `heartbeat-init + heartbeat-check + heartbeat-touch + heartbeat-status`.

- `make heartbeat-ci`  
  Run deterministic verification flow: `heartbeat-recover` then final `heartbeat-check`.

## Which Command Should I Use?

- Use `heartbeat-init` when the state file is missing and you want safe bootstrap (no overwrite).
- Use `heartbeat-touch` when validation already passes and you only need to refresh the loop timestamp.
- Use `heartbeat-cycle` for normal operation (`check` + `touch` in one step).
- Use `heartbeat-selftest` for quick health verification (`init` + `verify` + `status`).
- Use `heartbeat-recover` for one-command safe recovery (`init` + `check` + `touch` + `status`).
- Use `heartbeat-ci` when you need deterministic pass/fail verification after recovery.

### Quick Decision Table (`heartbeat-cycle` vs `heartbeat-touch`)

| Situation | Command |
|---|---|
| Routine heartbeat run where you want safety + validation | `make heartbeat-cycle` |
| You already validated state in this session and only need timestamp refresh | `make heartbeat-touch` |

## Typical Flow

1. `make heartbeat-selftest`
2. `make heartbeat-cycle`
3. `make heartbeat-status`

## Definition of Done (Atomic Cycle)

- [ ] Exactly one atomic improvement completed (or one clearly bounded maintenance task).
- [ ] One measurable metric recorded for that improvement (even if proxy).
- [ ] `memory/heartbeat-state.json` touched and changes committed.

## Heartbeat Report Template (Copy/Paste)

- Done:
- Next:
- Metric:
- Confidence:
- Blocker-Ask:

### Operator Guardrails

- Safety: Avoid all external/public actions unless explicit approval is given.
- Priority order: user-facing tasks > reliability/stability > docs polish.
- Timebox: Cap each heartbeat task at 15 minutes; defer anything larger to the next cycle.
- Anti-pattern: Avoid bundling unrelated edits in one heartbeat cycle.
- Escalation trigger: Report immediately when a blocker risks user-facing reliability or data loss.
- Stop condition: End the cycle with `HEARTBEAT_OK` when no high-value action exists.
- Metric quality: Prefer outcome metrics; if unavailable, use one explicit process metric.
- Confidence rubric: Use HIGH for direct verification, MEDIUM for partial/proxy verification, LOW for assumption-heavy early signals.
- Length/Tone: Keep reports to 5 lines max (Done/Next/Metric/Confidence/Blocker-Ask), concise and factual.

Example (5 lines):
- Done: Ran `make heartbeat-cycle` and committed timestamp update.
- Next: Add one small doc clarification for command choice.
- Metric: 1 clarification line added.
- Confidence: MEDIUM
- Blocker-Ask: None.

## Failure Example (Invalid JSON)

If `make heartbeat-check` fails with an invalid JSON error:

1. Inspect the file:
   - `cat memory/heartbeat-state.json`
2. Recreate/update with a valid structure:
   - `make heartbeat-touch`
3. Validate again:
   - `make heartbeat-check`
4. Confirm last timestamp:
   - `make heartbeat-status`

## Failure Example (Missing State File)

If `make heartbeat-check` fails because `memory/heartbeat-state.json` is missing:

1. Create default state file safely:
   - `make heartbeat-init`
2. Validate structure:
   - `make heartbeat-check`
3. Record current build loop timestamp:
   - `make heartbeat-touch`
4. Confirm status:
   - `make heartbeat-status`

## Quick Recovery Bundles (Copy/Paste)

One-command safe recovery (recommended):

```bash
make heartbeat-recover
```

Expected success output includes lines like:
- `OK: memory/heartbeat-state.json`
- `Updated memory/heartbeat-state.json (build_loop=...)`
- `build_loop: ... (YYYY-MM-DD HH:MM:SS KST)`

Failure signatures (quick mapping):
- `Missing state file: memory/heartbeat-state.json` → run `make heartbeat-recover` (or `heartbeat-init` path).
- `Invalid JSON in memory/heartbeat-state.json` → run `make heartbeat-recover` (or manual invalid-JSON steps).

### Failure Triage Order (Fast Path)

1. `make heartbeat-recover`
2. `make heartbeat-check`
3. `make heartbeat-status`

Invalid JSON (manual steps):

```bash
make heartbeat-touch
make heartbeat-check
make heartbeat-status
```

Missing state file (manual steps):

```bash
make heartbeat-init
make heartbeat-check
make heartbeat-touch
```
