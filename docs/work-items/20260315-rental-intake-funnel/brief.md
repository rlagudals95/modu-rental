---
status: "approved"
owner_role: "pm"
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
  - "packages/core/src/schemas/*"
  - "packages/core/src/services/*"
  - "packages/db/src/schema/*"
  - "packages/db/src/client/*"
  - "packages/analytics/*"
dependencies:
  - "docs/prds/modurent-demand-validation.md"
  - "docs/work-items/20260315-rental-intake-funnel/feature-spec.md"
skip_reason: null
---

# Brief

## Problem

- 정수기 렌탈을 검토하는 사용자는 가격보다 계약 구조를 이해하지 못해 손해를 보는 경우가 많다.
- 기존 렌탈몰은 상품을 많이 보여주지만, 내 상황에 맞는 shortlist와 해지 리스크 설명은 약하다.
- 상담 중심 판매 구조 탓에 사용자는 결정을 내리기 전에 이미 피로해지고, 운영자는 상담 전 결정도가 낮은 리드를 많이 받게 된다.

## Target User

- 서울·수도권의 28~39세 직장인
- 1~2인 가구, 전월세 거주 비중이 높고 2년 내 이사 가능성이 있는 사용자
- 정수기 렌탈을 검토하지만 상담 전에 후보를 좁히고 계약 리스크를 먼저 이해하고 싶은 사람

## Goal

- 이 work item은 `모두의렌탈` MVP의 첫 구현 slice로서 공개 추천 흐름을 `정수기` 카테고리 하나에 고정한다.
- 사용자가 `/`에서 자신의 상황을 답하고, `/result`에서 상위 3개 후보와 계약 요약을 본 뒤, `/consult`로 자연스럽게 넘어가는 흐름을 만든다.
- 운영자는 `/admin`과 `/admin/leads`에서 추천 맥락과 상담 전환 신호를 읽을 수 있어야 한다.

## Non-Goals

- 공기청정기 공개 추천 플로우
- 상품 편집용 관리자 폼과 수정 액션
- 실시간 제휴사 API 연동
- 자동 계약 체결, 결제, 정산
- LLM 자유 생성형 설명 문장
- 전국 설치 스케줄링, 모바일 앱, 복잡한 인증 체계

## Success Metric

- `landing_to_onboarding_start_rate >= 35%`
- `onboarding_completion_rate >= 60%`
- `recommendation_to_consult_click_rate >= 20%`
- `consult_request_to_connected_call_rate >= 50% within 7 days`
- `connected_call_to_contract_conversion_rate >= 15% within 30 days`
- Stop signal: 온보딩 시작 100건 이후에도 `onboarding_completion_rate < 35%`
- Stop signal: 결과 화면 조회 50건 이후에도 `recommendation_to_consult_click_rate < 10%`

## Acceptance Criteria

- [ ] 사용자가 `/`에서 "정수기 렌탈 계약을 대신 읽어주고 3개만 골라준다"는 가치를 이해하고 온보딩을 시작할 수 있다.
- [ ] 사용자가 8개 추천 질문과 마지막 연락처/동의 단계를 완료하면 lead가 저장되고 `/result?leadId=<id>`로 이동한다.
- [ ] 사용자가 `/result?leadId=<id>`에서 정확히 3개의 정수기 추천 결과와 각 상품의 월 납부액, 할인 종료 후 금액, 의무사용기간, 전체 계약기간, 총 예상 납부액, 관리 방식, 해지 주의 포인트, 추천 이유를 본다.
- [ ] 사용자의 이사 가능성, 예산, 관리 선호, 필수 기능, 설치 공간 같은 입력이 추천 결과에 실제로 반영된다.
- [ ] 사용자가 결과 화면에서 카카오 상담을 1순위 CTA로 보고, `/consult?leadId=<id>&productSlug=<slug>`로 이동해 선택 상품과 기본 정보가 채워진 상태에서 상담 요청을 남길 수 있다.
- [ ] 운영자가 `/admin/leads`에서 리드의 추천 입력 맥락과 상담 전환 여부를 확인할 수 있다.

## Open Questions

- 없음. 구현 blocking decision은 현재 feature, UX, FE, BE spec에서 고정한다.
