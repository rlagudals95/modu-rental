#!/usr/bin/env bash
set -euo pipefail

STATE_FILE="${1:-memory/heartbeat-state.json}"
mkdir -p "$(dirname "$STATE_FILE")"

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
