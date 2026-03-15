status: "done"
owner_role: "be"
source_request: "외부 workspace의 packages/ab-test, packages/user-behavior-log를 현재 modu-rental repo에서도 사용 가능하게 가져오기"
affected_paths:
  - "packages/ab-test/*"
  - "packages/user-behavior-log/*"
dependencies:
  - "docs/work-items/20260315-shared-packages-ab-test-behavior-log/brief.md"
skip_reason: null
---

# Backend Spec

## Schema And Validation Changes

- DB schema 변경 없음
- 기존 validation 규칙 변경 없음
- `packages/ab-test`의 실험 정의 검증과 `packages/user-behavior-log`의 payload 조합 규칙을 원본 패키지 수준 그대로 유지한다.

## Action Service Repository Plan

- app action/use case/repository 변경 없음
- 현재 작업은 reusable package boundary를 monorepo에 추가하는 것으로 한정한다.

## Analytics Impact

- 기존 analytics adapter 호출 방식은 유지한다.
- `packages/user-behavior-log`는 sender를 주입받는 순수 로깅 유틸로만 추가하고, 실제 앱 sender wiring은 후속 작업으로 분리한다.
- `packages/ab-test`는 experiment definition을 caller가 주입하는 helper로만 추가한다.

## Failure Modes

- workspace dependency 또는 Next transpile 설정이 빠지면 `apps/web` import 시 빌드가 실패할 수 있다.
- 패키지 복사 시 테스트/README/export 중 일부가 누락되면 공개 API drift가 생길 수 있다.
- 제품 전용 정책 파일까지 같이 복사하면 package 경계가 흐려질 수 있으므로 `legacy-src`는 제외한다.

## Boundary / Use Case / Repository Contract Test Plan

- `packages/ab-test`의 validation/middleware/client 테스트를 그대로 유지해 package contract를 보호한다.
- `packages/user-behavior-log`의 core/react 테스트를 그대로 유지해 logger contract를 보호한다.
- 최종 verify에서는 두 패키지 단위 테스트와 `apps/web` smoke test, workspace typecheck를 함께 확인한다.
