---
status: "approved"
owner_role: "fe"
source_request: "PRD: docs/prds/modurent-demand-validation.md"
affected_paths:
  - "apps/web/src/app/page.tsx"
  - "apps/web/src/app/result/page.tsx"
  - "apps/web/src/app/consult/page.tsx"
  - "apps/web/src/app/admin/page.tsx"
  - "apps/web/src/app/admin/leads/*"
  - "apps/web/src/app/admin/products/*"
  - "apps/web/src/modules/landing/*"
  - "apps/web/src/modules/recommendation/*"
  - "apps/web/src/modules/consultation/*"
  - "apps/web/src/modules/admin/*"
  - "apps/web/src/shared/types/form-action.ts"
dependencies:
  - "docs/work-items/20260315-rental-intake-funnel/brief.md"
  - "docs/work-items/20260315-rental-intake-funnel/ux-review.md"
skip_reason: null
---

# Frontend Spec

## Affected Routes

- `/`
- `/result`
- `/consult`
- `/admin`
- `/admin/leads`
- `/admin/products`

## Module Targets

- `apps/web/src/modules/landing/ui/landing-page.tsx`
- `apps/web/src/modules/recommendation/ui/*`
- `apps/web/src/modules/recommendation/model/*`
- `apps/web/src/modules/recommendation/actions/*`
- `apps/web/src/modules/consultation/ui/*`
- `apps/web/src/modules/consultation/actions/*`
- `apps/web/src/modules/admin/ui/*`
- `apps/web/src/shared/types/form-action.ts`

## Component Plan

- `apps/web/src/app/page.tsx`는 그대로 얇게 유지하고, `LandingPage`가 hero와 `RecommendationOnboardingShell`을 조합한다.
- `RecommendationOnboardingShell`은 client component로 두고, 현재 단계, 답변 draft, local draft 복원, 최종 제출 직전 검증을 담당한다.
- 질문 정의, step order, progress 계산, draft 직렬화는 `apps/web/src/modules/recommendation/model/*`의 순수 함수로 둔다.
- 마지막 제출은 `apps/web/src/modules/recommendation/actions/submit-recommendation-lead-action.ts`에서 수행한다.
- `/result/page.tsx`는 server entry로 두고 `leadId`를 읽어 `RecommendationResultPage`를 렌더링한다.
- `RecommendationResultPage`는 서버에서 계산된 추천 결과를 받아 렌더링하고, 카드 CTA 클릭 추적만 작은 client component로 분리한다.
- `/consult/page.tsx`는 search params를 읽어 prefill 데이터를 `ConsultationRequestForm`에 넘긴다.
- `/admin/leads`와 `/admin/products`는 read-only surface만 넓히고, 수정 폼은 추가하지 않는다.

## State And Events

- anonymous draft는 브라우저 `localStorage`의 `modurent_recommendation_draft_v1` 키에 저장한다.
- local draft는 첫 CTA 클릭 시 생성하고, 단계 이동과 값 변경 시 갱신한다.
- 성공 제출 후 local draft는 즉시 삭제하고 `/result?leadId=<id>`로 이동한다.
- `/result`는 local state에 의존하지 않고 `leadId`만으로 다시 열 수 있어야 한다.
- `/consult` handoff는 `leadId`와 `productSlug` search param을 기준으로 prefill한다.
- 내부 앱 이벤트는 `onboarding_started`, `onboarding_completed`, `recommendation_result_viewed`, `lead_form_submitted`, `consultation_requested`, `cta_clicked`를 사용한다.
- 마케팅 브리지 호출은 브라우저에서 `lead_form_submitted`, `consultation_requested`에만 연결한다.

## Test-First Plan

- 먼저 failing test로 고정할 FE slice는 `recommendation/model`의 step progression, local draft restore, submit readiness 판정이다.
- 다음으로 `/result`의 `leadId` 누락/잘못된 값 empty state를 route-level behavior로 고정한다.
- `/consult` handoff prefill은 search params가 있을 때와 없을 때 두 경로를 나눠 검증한다.
- manual verify는 `시작 -> 중간 이탈 -> 복원 -> 제출 -> 결과 -> 상담 handoff -> admin 노출` 순서로 돌린다.
- 접근성 수동 검증은 키보드 진행, 단계 전환 포커스, 오류 메시지 연결, CTA focus order를 본다.

## Out Of Scope

- 상품 편집용 관리자 폼
- 공기청정기 공개 추천 플로우
- LLM 자유 생성형 결과 문장
- 결제, 정산, 전국 설치 스케줄링
- 새로운 범용 shared form framework 추가
