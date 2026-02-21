.PHONY: heartbeat-help heartbeat-check heartbeat-verify heartbeat-doctor heartbeat-status heartbeat-init heartbeat-selftest heartbeat-recover heartbeat-touch heartbeat-cycle

heartbeat-help:
	@echo "Heartbeat commands:"
	@echo "  make heartbeat-help      # show this command list"
	@echo "  make heartbeat-init      # create default state file if missing"
	@echo "  make heartbeat-check     # validate state file schema"
	@echo "  make heartbeat-verify    # alias of heartbeat-check"
	@echo "  make heartbeat-doctor    # show recovery hints when check fails"
	@echo "  make heartbeat-status    # print last build_loop timestamp"
	@echo "  make heartbeat-touch     # update build_loop timestamp"
	@echo "  make heartbeat-cycle     # run check then touch"
	@echo "  make heartbeat-selftest  # run init + verify + status"
	@echo "  make heartbeat-recover   # run init + check + touch + status"

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

heartbeat-status:
	@python3 scripts/heartbeat-status.py

heartbeat-init:
	@python3 scripts/heartbeat-init.py

heartbeat-selftest: heartbeat-init heartbeat-verify heartbeat-status

heartbeat-recover: heartbeat-init heartbeat-check heartbeat-touch heartbeat-status

heartbeat-touch:
	./scripts/heartbeat-touch.sh memory/heartbeat-state.json

heartbeat-cycle: heartbeat-check heartbeat-touch
