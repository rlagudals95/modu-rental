# AGENTS.md - PMF Boilerplate Working Rules

## Project purpose

이 레포는 특정 한 서비스가 아니라, **여러 사이드프로젝트의 PMF를 빠르게 검증하기 위한 재사용 보일러플레이트**다.
첫 도메인은 "모두의렌탈"이며, 리드 생성/상담 전환/실험 운영 흐름을 기본 제공한다.

## Architecture principles

1. 단순함 우선: Next.js 단일 앱 + 공유 패키지
2. 실험 속도 우선: 작은 배치, 빠른 피드백
3. 타입 안정성: core의 zod 스키마를 소스 오브 트루스로 사용
4. 교체 가능성: analytics/provider, DB adapter는 인터페이스 중심
5. trunk-friendly: 긴 브랜치보다 작고 자주 머지

## Folder conventions

- `apps/web`: 사용자/운영자 UI와 라우트
- `packages/core`: 도메인 타입, DTO, 검증 스키마
- `packages/db`: Drizzle 스키마와 DB 접근
- `packages/analytics`: track 추상화
- `packages/ui`: 공용 UI 컴포넌트
- `docs`: 의사결정 기록과 운영 가이드

## Naming rules

- 파일명: kebab-case
- 타입/인터페이스: PascalCase
- Zod 스키마: `<domain>Schema`
- 이벤트명: `snake_case` (예: `lead_captured`)
- 실험키: `<surface>-<variable>-v<number>` (예: `landing-headline-v2`)

## How to add a new experiment

1. `packages/core`에 실험 입력/결과 스키마 추가
2. `packages/db`의 `experiments` 또는 관련 테이블에 필드 추가
3. `apps/web/app/admin/experiments`에 노출
4. 필요한 트래킹 이벤트를 `@repo/analytics track()`로 추가
5. 최소 1개 unit 테스트 + 필요 시 E2E 스모크 케이스 추가

## Keep PRs small

- 한 PR = 한 문제 해결
- 권장 변경량: 150~400 LOC (예외 가능하나 사유 기록)
- 기능 + 문서 + 테스트를 한 묶음으로 제출
- 거대 리팩터링은 단계 분할 후 순차 머지

## What NOT to overengineer

- 조기 추상화(아직 1개 구현인데 인터페이스 다층화)
- 복잡한 디자인 시스템(필요한 컴포넌트만)
- 과한 상태관리 도입
- PMF 전 단계의 권한/정산/워크플로 엔진
- 외부 SaaS 종속을 전제로 한 구조

실험 단계의 승부처는 "정교함"보다 "학습 주기"다.
