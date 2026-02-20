.PHONY: heartbeat-check heartbeat-verify heartbeat-touch heartbeat-cycle

heartbeat-check:
	./scripts/heartbeat-touch.sh --check memory/heartbeat-state.json

heartbeat-verify: heartbeat-check

heartbeat-touch:
	./scripts/heartbeat-touch.sh memory/heartbeat-state.json

heartbeat-cycle: heartbeat-check heartbeat-touch
