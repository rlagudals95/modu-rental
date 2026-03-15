status: "done"
owner_role: "fe"
source_request: "외부 workspace의 packages/ab-test, packages/user-behavior-log를 현재 modu-rental repo에서도 사용 가능하게 가져오기"
affected_paths:
  - "apps/web/package.json"
  - "apps/web/next.config.ts"
  - "apps/web/src/lib/workspace-packages.test.ts"
dependencies:
  - "docs/work-items/20260315-shared-packages-ab-test-behavior-log/brief.md"
skip_reason: null
---

# Frontend Spec

## Affected Routes

- 직접 변경 없음

## Module Targets

- 직접 변경 없음
- app-level dependency wiring만 추가

## Component Plan

- UI 통합은 이번 범위에 포함하지 않는다.
- `apps/web`는 새 workspace 패키지를 dependency로 선언하고, Next가 외부 TS source를 처리할 수 있게 `transpilePackages`만 갱신한다.

## State And Events

- 새 client state는 추가하지 않는다.
- 이벤트 taxonomy 변경은 하지 않고, package import 경로만 검증한다.

## Test-First Plan

- `apps/web` 테스트에서 `@pmf/ab-test`, `@pmf/user-behavior-log`, `@pmf/user-behavior-log/react` import가 해석되는지 smoke test로 고정한다.
- smoke test는 assignment 조회 API와 behavior logger core API를 호출해 대표 동작이 깨지지 않는지 확인한다.
- 실제 route/module UI 연결은 후속 feature에서 검증한다.

## Out Of Scope

- middleware 도입
- page/component에서 새 패키지를 실제로 호출하는 UI 통합
- 기존 app-local analytics helper 리팩터링
