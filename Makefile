.PHONY: heartbeat-check heartbeat-touch

heartbeat-check:
	./scripts/heartbeat-touch.sh --check memory/heartbeat-state.json

heartbeat-touch:
	./scripts/heartbeat-touch.sh memory/heartbeat-state.json
