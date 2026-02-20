#!/usr/bin/env python3
import datetime as dt
import json

PATH = "memory/heartbeat-state.json"

with open(PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

ts = data.get("lastChecks", {}).get("build_loop")
if isinstance(ts, int):
    local = dt.datetime.fromtimestamp(ts).astimezone()
    print(f"build_loop: {ts} ({local.strftime('%Y-%m-%d %H:%M:%S %Z')})")
else:
    print("build_loop: null")
