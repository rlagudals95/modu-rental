#!/usr/bin/env python3
import json
from pathlib import Path

PATH = Path("memory/heartbeat-state.json")
PATH.parent.mkdir(parents=True, exist_ok=True)

if PATH.exists():
    print(f"exists: {PATH} (no changes)")
else:
    data = {
        "lastChecks": {
            "build_loop": None,
            "email": None,
            "calendar": None,
            "weather": None,
        }
    }
    PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"created: {PATH}")
