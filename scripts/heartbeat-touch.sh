#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'TXT'
Usage:
  ./scripts/heartbeat-touch.sh [state-file]
  ./scripts/heartbeat-touch.sh --check [state-file]

Options:
  --check   Validate state file JSON structure without modifying it.
TXT
}

mode="touch"
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

if [[ "${1:-}" == "--check" ]]; then
  mode="check"
  shift
fi

STATE_FILE="${1:-memory/heartbeat-state.json}"
mkdir -p "$(dirname "$STATE_FILE")"

if [[ "$mode" == "check" ]]; then
  python3 - "$STATE_FILE" <<'PY'
import json, sys
path = sys.argv[1]
try:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"Missing state file: {path}", file=sys.stderr)
    raise SystemExit(2)
except json.JSONDecodeError as e:
    print(f"Invalid JSON in {path}: {e}", file=sys.stderr)
    raise SystemExit(3)

if not isinstance(data, dict):
    print("Top-level JSON must be an object", file=sys.stderr)
    raise SystemExit(4)

last = data.get('lastChecks')
if not isinstance(last, dict):
    print("Missing or invalid 'lastChecks' object", file=sys.stderr)
    raise SystemExit(5)

build = last.get('build_loop')
if build is not None and not isinstance(build, int):
    print("'lastChecks.build_loop' must be null or integer", file=sys.stderr)
    raise SystemExit(6)

print(f"OK: {path}")
PY
  exit 0
fi

now="$(date +%s)"

if [[ -f "$STATE_FILE" ]]; then
  python3 - "$STATE_FILE" "$now" <<'PY'
import json, sys
path = sys.argv[1]
now = int(sys.argv[2])
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)
last = data.setdefault('lastChecks', {})
last['build_loop'] = now
with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')
PY
else
  cat > "$STATE_FILE" <<JSON
{
  "lastChecks": {
    "build_loop": $now,
    "email": null,
    "calendar": null,
    "weather": null
  }
}
JSON
fi

echo "Updated $STATE_FILE (build_loop=$now)"
