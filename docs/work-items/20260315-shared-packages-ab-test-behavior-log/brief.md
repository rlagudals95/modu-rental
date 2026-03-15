status: "done"
owner_role: "pm"
source_request: "외부 workspace의 packages/ab-test, packages/user-behavior-log를 현재 modu-rental repo에서도 사용 가능하게 가져오기"
affected_paths:
  - "packages/ab-test/*"
  - "packages/user-behavior-log/*"
  - "apps/web/package.json"
  - "apps/web/next.config.ts"
  - "apps/web/src/lib/workspace-packages.test.ts"
  - "AGENTS.md"
  - "ai/context/project.md"
  - "docs/architecture.md"
  - "README.md"
dependencies:
  - "ai/context/project.md"
  - "ai/context/spec-driven.md"
  - "ai/context/doc-sync.md"
  - "docs/architecture.md"
skip_reason: null
---

# Brief

## Problem

현재 `modu-rental` 저장소에는 재사용 가능한 A/B 테스트 패키지와 행동 로깅 패키지가 없어, 다른 workspace에서 이미 정리된 공통 모듈을 다시 구현하거나 로컬 코드로 흩어지게 만들 위험이 있다. 특히 `apps/web`에서 middleware/client/server assignment 조회와 `page_view`/`click`/`impression` 로깅을 공통 패키지로 바로 import할 수 없는 상태라, 다음 실험 작업에서 불필요한 복제가 발생할 수 있다.

## Target User

이 저장소에서 다음 실험과 운영 기능을 구현할 개발자와 AI 코딩 에이전트.

## Goal

`packages/ab-test`, `packages/user-behavior-log`를 현재 monorepo에 추가하고, `apps/web`에서 workspace dependency로 바로 import 가능한 상태를 만든다. 패키지 자체 테스트와 `apps/web` 기준 smoke test로 공개 API가 실제로 해석되는지 확인한다.

## Non-Goals

- 랜딩, 폼, 어드민 화면에 두 패키지를 실제로 연결하는 것
- 기존 analytics/event taxonomy를 새 패키지 기준으로 리팩터링하는 것
- 실험 정책 정의 파일이나 제품 전용 wrapper를 추가하는 것
- 기존 `TrackedLink`, `PageViewTracker` 등의 app-local 코드 교체

## Success Metric

- `pnpm --filter @pmf/ab-test test` 통과
- `pnpm --filter @pmf/user-behavior-log test` 통과
- `pnpm --filter web test -- workspace-packages.test.ts` 통과
- `apps/web`가 두 패키지를 dependency와 `transpilePackages`에 포함해 import 준비 상태를 유지

## Acceptance Criteria

- [ ] `packages/ab-test`가 workspace 패키지로 추가되고 public exports, 테스트, README가 유지된다.
- [ ] `packages/user-behavior-log`가 workspace 패키지로 추가되고 core/react exports, 테스트, README가 유지된다.
- [ ] `apps/web`가 `@pmf/ab-test`, `@pmf/user-behavior-log`를 dependency로 선언하고 Next transpile 대상에 포함한다.
- [ ] `apps/web`의 smoke test가 두 패키지의 대표 API를 실제 import해서 검증한다.
- [ ] 구조 문서가 새 패키지 경계를 설명해 코드와 문서가 어긋나지 않는다.

## Open Questions

- 현재 범위에서는 없음. 실제 제품 흐름 연결은 후속 작업으로 분리한다.
