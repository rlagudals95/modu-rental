status: "skipped"
owner_role: "pd"
source_request: "외부 workspace의 packages/ab-test, packages/user-behavior-log를 현재 modu-rental repo에서도 사용 가능하게 가져오기"
affected_paths:
  - "packages/ab-test/*"
  - "packages/user-behavior-log/*"
dependencies:
  - "docs/work-items/20260315-shared-packages-ab-test-behavior-log/brief.md"
skip_reason: "이번 작업은 공유 패키지 이식과 workspace wiring만 다루며 사용자-facing copy, IA, 상태 UX 변경이 없다."
---

# UX Review

## Entry Points

- 해당 없음

## Copy Changes

- 해당 없음

## IA Changes

- 해당 없음

## Happy Path

- 개발자가 `apps/web`에서 두 패키지를 바로 import할 수 있는 상태를 만든다.

## Edge States

- 사용자-facing edge state 없음

## Accessibility Checks

- 해당 없음
