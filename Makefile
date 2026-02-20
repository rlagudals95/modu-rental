.PHONY: heartbeat-check heartbeat-verify heartbeat-doctor heartbeat-touch heartbeat-cycle

heartbeat-check:
	./scripts/heartbeat-touch.sh --check memory/heartbeat-state.json

heartbeat-verify: heartbeat-check

heartbeat-doctor:
	@./scripts/heartbeat-touch.sh --check memory/heartbeat-state.json >/dev/null 2>&1 \
	&& echo "OK: memory/heartbeat-state.json" \
	|| (echo "heartbeat state check failed. Try:" && \
		echo "  1) make heartbeat-touch        # recreate/update the file" && \
		echo "  2) make heartbeat-check        # validate again" && \
		echo "  3) cat memory/heartbeat-state.json" && \
		false)

heartbeat-touch:
	./scripts/heartbeat-touch.sh memory/heartbeat-state.json

heartbeat-cycle: heartbeat-check heartbeat-touch
