---
status: "approved"
owner_role: "product-squad"
related_prd: "docs/prds/modurent-demand-validation.md"
related_work_item: "docs/work-items/20260315-rental-intake-funnel"
feature_slug: "rental-intake-funnel"
implementation_readiness: "ready"
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
  - "packages/core/*"
  - "packages/db/*"
  - "packages/analytics/*"
  - "apps/web/src/lib/analytics.ts"
dependencies:
  - "docs/prds/modurent-demand-validation.md"
  - "docs/work-items/20260315-rental-intake-funnel/brief.md"
  - "docs/work-items/20260315-rental-intake-funnel/ux-review.md"
  - "docs/work-items/20260315-rental-intake-funnel/frontend-spec.md"
  - "docs/work-items/20260315-rental-intake-funnel/backend-spec.md"
skip_reason: null
---

# Feature Spec

## Feature Summary

`rental-intake-funnel`은 모두의렌탈 MVP의 첫 공개 흐름을 정수기 카테고리 하나로 좁혀 구현하는 feature slice다. 랜딩, 대화형 온보딩, 추천 결과, 상담 handoff, 관리자 read exposure를 한 번에 연결한다.

## Problem

렌탈 사용자는 가격표보다 계약 구조를 이해하지 못해 손해를 보는 경우가 많다. 기존 렌탈몰은 상품을 많이 보여주지만, 내 상황에 맞는 shortlist와 해지 리스크 설명은 약하다. 상담 중심 판매 구조 탓에 사용자는 결정을 내리기 전에 이미 피로해지고, 운영자는 상담 전 결정도가 낮은 리드를 많이 받게 된다.

## Goal

`모두의렌탈`을 가격 비교몰이 아니라 계약 이해 + 3개 추천 + 상담 연결 제품으로 검증한다. 이 slice는 첫 4주 안에 정수기 public recommendation flow를 여는 것을 목표로 한다.

## In Scope

- `/` 랜딩을 정수기 추천 온보딩 진입점으로 재구성한다.
- 대화형 온보딩 8문항 + 마지막 연락처/동의 단계로 lead를 생성한다.
- `/result?leadId=<id>` route를 추가해 추천 결과 3개를 보여준다.
- deterministic template 기반 추천 이유/계약 요약을 카드에 노출한다.
- 결과 화면에서 카카오 상담과 상담 요청 handoff를 지원한다.
- `/consult`는 `leadId`와 `productSlug`를 받아 prefill 모드로 동작한다.
- `/admin/leads`와 `/admin/products`에서 추천/계약 데이터 read exposure를 넓힌다.
- 추천/상담 퍼널에 필요한 analytics 이벤트와 payload를 확장한다.

## Out Of Scope

- 공기청정기 public flow
- 상품 편집용 관리자 액션
- LLM 자유 생성형 explainer
- 결제/정산/계약 체결
- 전국 설치 스케줄링
- 별도 모바일 앱

## Target User

서울·수도권의 28~39세 직장인 중, 정수기 렌탈을 검토하고 있고 상담 전에 결론을 정리하고 싶은 사람이 핵심이다. 특히 1~2인 가구, 전월세 거주 비중이 높고, 2년 내 이사 가능성을 염두에 두는 사용자를 우선 타깃으로 둔다.

## User Flow

1. 사용자가 `/`에 진입해 가치 제안과 CTA를 확인한다.
2. CTA 클릭 후 대화형 온보딩을 시작하고 8개 질문에 차례대로 답한다.
3. 마지막 단계에서 이름, 전화번호, 선택 이메일, 동의를 제출한다.
4. 서버는 lead와 qualification 데이터를 저장하고 `/result?leadId=<id>`로 보낸다.
5. 결과 화면은 저장된 lead와 active products를 기준으로 추천 3개를 계산해 렌더링한다.
6. 사용자는 카드별 CTA로 `/consult?leadId=<id>&productSlug=<slug>`에 진입한다.
7. 상담 요청이 저장되면 운영자는 `/admin/leads`에서 추천 맥락과 상담 여부를 본다.

## Locked Implementation Decisions

- public recommendation category는 `정수기` 하나로 고정한다.
- anonymous draft는 localStorage에 저장하고, 결과 데이터는 별도 draft table 없이 persisted lead로부터 서버에서 재계산한다.
- 결과 route는 `/result?leadId=<id>`로 고정한다.
- result primary CTA는 카카오 handoff이고, 상담 요청 폼은 secondary path다.
- explanation layer는 deterministic template로 구현하고, LLM 후처리는 follow-up work item으로 미룬다.
- launch 전제는 공개 feature option별 active product 3개 이상이다.

## Acceptance Criteria

- [ ] 사용자가 `/`에서 "정수기 렌탈 계약을 대신 읽어주고 3개만 골라준다"는 가치를 이해하고 온보딩을 시작할 수 있다.
- [ ] 사용자가 8개 추천 질문과 마지막 연락처/동의 단계를 완료하면 성공 메시지 없이 바로 `/result?leadId=<id>`로 이동한다.
- [ ] `/result?leadId=<id>`는 정확히 3개의 추천 카드와 각 카드의 월 납부액, 할인 종료 후 금액, 의무사용기간, 전체 계약기간, 총 예상 납부액, 관리 방식, 해지 주의 포인트, 추천 이유를 보여준다.
- [ ] 이사 가능성, 예산, 관리 선호, 필수 기능, 설치 공간 입력이 결과 정렬과 설명 문구에 반영된다.
- [ ] 사용자가 결과 화면에서 카카오 또는 상담 요청 경로를 선택하면 선택 상품과 기본 맥락이 `/consult`에 이어진다.
- [ ] 운영자가 `/admin/leads`에서 새 qualification 필드와 상담 전환 여부를 확인할 수 있다.

## Analytics Impact

- `cta_clicked`는 hero CTA와 result CTA 구분이 가능해야 한다.
- `onboarding_started`, `onboarding_completed`, `recommendation_result_viewed`가 내부 앱 이벤트로 저장되어야 한다.
- `lead_form_submitted`는 recommendation input payload와 함께 저장되어야 한다.
- `consultation_requested`는 `leadId`와 `selectedProductSlug`를 남겨 recommendation flow에서 온 상담인지 구분 가능해야 한다.

## Data Impact

- lead는 연락처 외에 recommendation qualification 필드를 저장해야 한다.
- product는 계약 요약과 추천 점수화에 필요한 필드를 저장해야 한다.
- consultation request는 optional `leadId`와 selected product context를 받아야 한다.
- admin overview와 leads/products table은 새 필드를 읽을 수 있어야 한다.

## Affected Routes And Modules

- `apps/web/src/app/page.tsx`
- `apps/web/src/app/result/page.tsx`
- `apps/web/src/app/consult/page.tsx`
- `apps/web/src/app/admin/page.tsx`
- `apps/web/src/app/admin/leads/*`
- `apps/web/src/app/admin/products/*`
- `apps/web/src/modules/landing/*`
- `apps/web/src/modules/recommendation/*`
- `apps/web/src/modules/consultation/*`
- `apps/web/src/modules/admin/*`
- `packages/core/*`
- `packages/db/*`
- `packages/analytics/*`

## Test Strategy

- 첫 failing test는 recommendation engine이 입력 조건에 따라 top 3를 안정적으로 반환하는 contract다.
- 다음 slice는 `onboarding validation -> lead persistence -> result route rendering -> consult handoff -> admin exposure` 순서로 나눈다.
- UI 수동 검증은 `랜딩 -> 이탈/복원 -> 결과 -> 상담 -> admin` 경로로 수행한다.
- 변경 범위에 맞춰 최소 `pnpm test`, `pnpm typecheck`, `pnpm lint`와 관련 targeted test를 실행한다.

## Docs To Update

- `docs/prds/modurent-demand-validation.md`
- `docs/work-items/20260315-rental-intake-funnel/brief.md`
- `docs/work-items/20260315-rental-intake-funnel/ux-review.md`
- `docs/work-items/20260315-rental-intake-funnel/frontend-spec.md`
- `docs/work-items/20260315-rental-intake-funnel/backend-spec.md`

## Open Questions

- 없음. 남은 결정은 현재 work item 범위를 막지 않는 운영 후속 항목이다.

## Implementation Readiness

Ready. 현재 문서 세트 기준으로 구현 착수 가능하다.
