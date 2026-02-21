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

## Typical Flow

1. `make heartbeat-selftest`
2. `make heartbeat-cycle`
3. `make heartbeat-status`

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
