---
title: "모두의렌탈 AI 추천 중개 MVP"
status: draft
owner: "임성민 (PO)"
source_url: ""
created_at: "2026-03-15"
updated_at: "2026-03-15"
---

# PRD

## Summary

- 이 문서는 `모두의렌탈`의 첫 실제 제품 PRD다. 목표는 "렌탈 계약을 대신 읽어주고, 내 상황에 맞는 상품 3개만 골라주는 AI 에이전트"를 4주 안에 MVP로 만들고, 3개월 동안 수요와 상담 전환 신호를 검증하는 것이다.
- 첫 버전의 코어는 AI 자체가 아니라 구조화된 상품 데이터, 룰 기반 추천, 계약 리스크를 풀어주는 설명, 그리고 상담 전환까지 이어지는 짧은 흐름이다.
- canonical PRD는 이 문서 하나로 유지하고, 현재 진행 중인 `rental-intake-funnel` work item도 이 문서를 기준으로 해석한다.

## Contacts

| 이름 | 역할 | 코멘트 |
| --- | --- | --- |
| 임성민 | PO | 문제 정의, 추천 흐름 설계, PRD와 인터뷰 관리 |
| 정상우 | BD | 제휴처 발굴, 상품 정보 수집, 상담 운영, 유입 채널 테스트 |
| 김형민 | Dev | 상품 DB, 추천 엔진, AI 설명 레이어, 이벤트 로깅 |

## Problem

- 가전 렌탈을 검토하는 사용자는 가격보다 계약 구조에서 손해를 보기 쉽지만, 상품별 의무사용기간, 전체 계약기간, 할인 종료 시점, 위약금 조건이 제각각이라 스스로 비교하기 어렵다.
- 기존 렌탈몰과 상담 채널은 상품을 많이 보여주지만, "내 상황에서 무엇을 피해야 하는지"를 먼저 정리해주지 못한다.
- 특히 전월세 거주자나 1~2인 가구처럼 이사 가능성이 있는 사용자는 장기 계약 리스크가 크지만, 상담 전에는 그 차이를 이해하기 어렵다.
- 따라서 첫 해결 과제는 "사용자가 상담 전에 자신의 조건을 입력하고, 계약 리스크까지 반영된 상위 3개 옵션을 받아 결정도를 높일 수 있는가"이다.

## Target User And Context

- 핵심 세그먼트: 서울·수도권의 28~39세 직장인, 특히 1~2인 가구와 전월세 거주 비중이 높고 2년 내 이사 가능성이 있는 사용자
- 현재 행동: 브랜드명 검색, 블로그 후기, 카페 글, 오픈마켓, 카카오 상담을 오가며 비교한다.
- 대안: 코웨이·SK매직·쿠쿠홈시스 등 브랜드 직영/대리점 상담, 렌탈 비교몰, 지인 추천
- 관련 맥락: 정수기 중심으로 시작하고, 공기청정기를 바로 다음 확장 카테고리로 둔다.
- 관련 제약: 계약서와 가격표를 꼼꼼히 읽기 어렵고, 상담을 시작하면 특정 상품으로 몰릴까 걱정한다.
- [Assumption] 첫 4주 베타는 개인 고객 중심으로 설계하고, 소형 사무실/매장 수요는 later scope로 둔다.

## Core Use Cases

### Primary

- 상황: 사용자가 정수기 렌탈을 고민하고 있지만, 이사 가능성과 예산 때문에 어떤 계약이 안전한지 판단하지 못한다.
- 사용자 행동: 랜딩에서 대화형 온보딩 7~9문항에 답하고, 자신의 상황에 맞는 상위 3개 상품과 계약 요약을 확인한다.
- 기대 결과: 사용자는 왜 이 3개가 나왔는지와 어떤 해지/장기계약 리스크가 있는지를 이해하고 상담 여부를 더 쉽게 결정한다.

### Secondary

- 상황: 사용자가 추천 결과를 봤지만 설치 가능 여부, 실제 재고, 프로모션 적용 조건은 아직 확인되지 않았다.
- 사용자 행동: 결과 화면에서 카카오 상담, 폼 제출, 전화 예약 중 하나를 선택해 추천 결과를 상담 채널로 넘긴다.
- 기대 결과: 사용자는 자신의 답변과 추천 맥락을 반복 설명하지 않고 후속 상담을 시작할 수 있고, 운영자는 더 높은 의도를 가진 리드를 우선 처리한다.

## Jobs To Be Done

- 여러 판매 채널에 같은 말을 반복하지 않고 내 상황을 한 번에 정리하고 싶다.
- 계약서의 어려운 말 대신 내가 얼마를 얼마나 오래 내는지와 무엇을 조심해야 하는지 바로 알고 싶다.
- 상담을 받더라도 미리 후보를 3개 정도로 줄여서 덜 흔들리고 싶다.
- 해지비용, 기간 차이, 관리 방식 때문에 나중에 후회하지 않고 싶다.

## Evidence And Insights

### Facts

- 팀 킥오프 입력 기준으로 한국 렌탈 시장은 약 40조원 규모이며, 첫 진입 카테고리는 정수기와 공기청정기다.
- 2025년 5월 30일 한국소비자원 발표에 따르면 2022년 1월부터 2025년 3월까지 정수기 렌탈 관련 피해구제 신청은 1,462건이었고, 2024년 한 해만 536건이었다. 문제의 중심은 가격보다 계약, 해지, 위약금 같은 조건 이해 부족이다. [출처](https://www.kca.go.kr/home/sub.do?menukey=4002&mode=view&no=1004628531)
- 2025년 통계청 1인 가구 통계에 따르면 1인 가구의 주택 소유율은 32.0%이고, 취업한 1인 가구 중 30대 비중은 24.4%다. 이 수치는 이동 가능성이 있고 계약 유연성을 신경 쓰는 직장인이라는 초기 타깃 가설과 맞닿아 있다. [출처](https://kostat.go.kr/board.es?mid=a10301010000&bid=103&tag=&act=view&list_no=434448&ref_bid=203,204,205&nPage=1)
- 팀의 2026년 말 목표는 인당 월 500만원 순마진이며, 첫 아이템은 가전 렌탈 중개 서비스다.
- 첫 4주 안에 PRD 확정, 타깃 인터뷰 10명, 상품 20~30개 수집, 추천 질문 확정, 랜딩/온보딩/룰 엔진/결과 페이지/AI 설명/상담 연결/이벤트 수집/운영 대시보드 최소 버전을 진행해야 한다.

### Interpretations

- [Inference] 이 시장의 첫 진입 포인트는 최저가 비교보다 계약 구조를 이해하게 해주는 의사결정 보조에 있다.
- [Inference] 직접 결제까지 먹는 구조보다 상담 전 결정도를 높여 리드 품질을 높이는 프리세일즈 에이전트 포지션이 초기 진입에 유리하다.
- [Inference] 사용자는 모든 옵션보다 믿을 수 있는 3개를 원할 가능성이 높고, 이는 정보 과부하를 줄여 상담 클릭률을 높일 수 있다.

### Hypotheses

- [Assumption] 계약 요약과 해지 주의 포인트를 전면에 배치하면 일반 렌탈몰 카피보다 온보딩 시작률과 상담 전환율이 높아진다.
- [Assumption] 이사 가능성, 관리 방식, 예산, 필수 기능을 반영한 룰 기반 추천만으로도 초기 사용자에게 충분한 설득력을 제공할 수 있다.
- [Assumption] AI가 추천 근거를 자연어로 설명하면 사용자는 추천을 더 신뢰하고 상담까지 이어질 가능성이 높아진다.
- [Assumption] 첫 버전은 정수기와 공기청정기만으로도 핵심 문제 검증에 충분하다.

## Goals

### Business Goal

- 2026년 6월 말 피트스탑 전까지 `모두의렌탈`이 단순 정보 페이지가 아니라 상담과 계약 가능성이 있는 리드를 만들어내는지 검증한다.
- 2026년 말까지 인당 월 500만원 순마진을 만들 수 있는 초기 운영 모델의 선행 지표를 확보한다.

### User Outcome

- 사용자는 상담 전에 자신의 상황에 맞는 상품 3개와 계약 리스크를 이해하고, 결정 스트레스를 줄인 상태로 다음 행동을 선택할 수 있다.

### Non-Goals

- 빌리고·아정당 같은 종합 렌탈몰 전체를 따라 만드는 것
- 실시간 입점 API 연동
- 직접 렌탈 자산 보유
- 결제 시스템 정식 도입 또는 전용 앱 출시
- 전국 설치 스케줄링 자동화
- 블랙박스형 AI가 독자적으로 순위를 결정하는 추천 모델 구축
- 복잡한 인증과 전국 단위 운영 체계를 초기에 도입하는 것

## Success Metrics

- North-star: `weekly_consult_requests_from_recommendation`
- Leading metrics:
  - `landing_to_onboarding_start_rate >= 35%`
  - `onboarding_completion_rate >= 60%`
  - `recommendation_to_consult_click_rate >= 20%`
  - `consult_request_to_connected_call_rate >= 50% within 7 days`
  - `connected_call_to_contract_conversion_rate >= 15% within 30 days`
- PMF qualitative signals:
  - "다른 데보다 이해가 쉬웠어요"
  - "계약기간이 이렇게 다른 줄 몰랐어요"
  - "해지비용이 제일 걱정됐는데 정리돼서 좋았어요"
  - "추천을 받으니 결정이 쉬웠어요"
- Stop or pivot signals:
  - 온보딩 시작 100건 이후에도 `onboarding_completion_rate < 35%`
  - 결과 화면 조회 50건 이후에도 `recommendation_to_consult_click_rate < 10%`
  - "결국 가격만 중요하다", "기존 렌탈몰이랑 차이 모르겠다"는 반응이 인터뷰와 베타 피드백에서 반복된다.

## Constraints

- 팀은 PO 1명, BD 1명, Dev 1명으로 운영하며 각자 DRI 영역에서 빠르게 실행한다.
- 다음 주요 마감은 2026년 3월 22일이며, 2026년 6월 말에 3개월 실행 회고를 진행한다.
- 첫 4주 안에 베타를 열어야 하므로 상품 업데이트와 상담 운영은 일부 수기 방식이 허용된다.
- 기술 제약은 Next.js 단일 앱, Vercel 배포, GitHub 모노레포, Supabase/Postgres 기본 방향과 로컬 fallback 유지다.

## Solution Direction

- 랜딩은 가격 비교보다 계약을 대신 읽어주고 내 상황에 맞게 3개만 골라준다는 가치를 전면에 둔다.
- 사용자는 대화형 온보딩에서 가구 수, 거주 형태, 이사 가능성, 필요 기능, 예산, 관리 선호, 설치 공간, 가장 걱정되는 요소를 답한다.
- 추천 로직은 구조화된 상품 데이터와 명시적 룰로 상위 3개를 매칭하고, AI는 추천 이유와 계약 리스크를 자연어로 설명한다.
- 결과 카드는 월 납부액, 할인 적용 기간, 할인 종료 후 금액, 의무사용기간, 전체 계약기간, 총 예상 납부액, 관리 방식, 이동 적합성, 해지 주의 포인트를 함께 보여준다.
- 결과 이후 CTA는 "이 3개 중 설치 가능 조건 확인하기", "상담원에게 비교 결과 전달하기"처럼 구체 행동 중심으로 설계한다.

## Scope

### In Scope

- 정수기와 공기청정기 중심의 상품 카탈로그 20~30개 수기 수집
- 대화형 온보딩 7~9문항, 진행률 표시, 중간 이탈 후 재진입
- 룰 기반 상위 3개 추천
- AI 기반 추천 이유/계약 요약 문장 생성
- 결과 화면과 상담 전환 CTA
- 카카오 상담, 폼 제출, 전화 예약 중 최소 2개 이상 연결
- 최소 수준의 상품/룰 수정 가능한 관리자 화면 또는 운영 입력 수단
- 핵심 퍼널 이벤트 수집과 운영 대시보드 최소 버전

### Later Scope

- 비데, 매트리스, 안마의자 등 카테고리 확장
- 추천 결과 공유 링크 또는 상담원 prefill 자동화 고도화
- 제휴처별 실시간 프로모션 반영
- 계약 성사 이후 후속 관리 경험
- 지역 확장과 설치 일정 자동화

### Out Of Scope

- 전국 모든 렌탈 카테고리를 한 번에 다루는 것
- 실시간 가격/재고 API 동기화
- 자동 계약 체결, 결제, 정산 백오피스
- 완전 무인 상담 자동화
- 무거운 디자인 시스템이나 별도 모바일 앱

## Release Plan

### First Release

- 첫 릴리스는 4주 안에 끝나는 베타를 목표로 한다.
- 범위는 정수기 중심 추천 흐름, 20~30개 SKU, 계약 요약 카드, 상담 CTA, 최소 운영 화면이다.
- 첫 구현 slice는 public recommendation flow를 `정수기` 카테고리 하나에 고정하고, 공기청정기는 다음 확장 단계로 둔다.

### Next Release

- 첫 베타에서 신호가 나오면 공기청정기를 추가하고, 추천 이유 품질과 상담 핸드오프를 더 다듬는다.
- 이 단계에서도 자동 계약 체결이나 실시간 입점 API는 넣지 않는다.

### Later

- 3개월 피트스탑 전까지 카테고리 확장, 계약 비교 고도화, 운영 도구 개선을 선택지로만 둔다.

## Feature Candidates

### Rental Intake Funnel

- summary: 랜딩, 대화형 온보딩, 추천 결과, 상담 CTA까지 이어지는 핵심 사용자 흐름을 만든다.
- user_value: 사용자는 상담 전에 내 상황에 맞는 3개 후보와 계약 주의점을 이해할 수 있다.
- primary_module: recommendation
- routes: /,/consult,/admin,/admin/leads
- ui_surface: yes
- admin_surface: yes
- backend_changes: yes
- auth_required: no
- payment_required: no
- external_provider_impact: none
- analytics_required: yes
- recommended: yes

### Rule-Based Recommendation Engine

- summary: 사용자 입력과 상품 속성을 매칭해 상위 3개 상품만 고르고, 어떤 규칙이 반영됐는지 추적 가능하게 만든다.
- user_value: 사용자는 정보 과부하 없이 실제 선택 가능한 후보를 받는다.
- primary_module: recommendation
- routes: /,/consult,/admin
- ui_surface: yes
- admin_surface: yes
- backend_changes: yes
- auth_required: no
- payment_required: no
- external_provider_impact: none
- analytics_required: yes
- recommended: yes

### Contract Summary Explainer

- summary: 추천 결과마다 비용 구조, 계약 기간, 해지 주의 포인트, 추천 이유를 자연어로 보여준다.
- user_value: 사용자는 단순 가격표가 아니라 자신의 상황에서 무엇을 조심해야 하는지 이해한다.
- primary_module: recommendation
- routes: /,/consult
- ui_surface: yes
- admin_surface: no
- backend_changes: yes
- auth_required: no
- payment_required: no
- external_provider_impact: llm
- analytics_required: yes
- recommended: yes

### Consultation Handoff

- summary: 추천 결과와 선택한 상품을 카카오 상담, 폼 제출, 전화 예약 흐름으로 넘겨 중복 설명을 줄인다.
- user_value: 사용자는 이미 정리된 결과를 그대로 상담에 넘길 수 있다.
- primary_module: consultation
- routes: /consult,/admin/leads
- ui_surface: yes
- admin_surface: yes
- backend_changes: yes
- auth_required: no
- payment_required: no
- external_provider_impact: kakao
- analytics_required: yes
- recommended: yes

### Product Catalog Admin

- summary: 운영자가 SKU, 관리 방식, 계약 기간, 해지 주의 포인트를 직접 수정할 수 있는 최소 관리 화면을 만든다.
- user_value: 잘못된 계약 정보로 추천이 흔들리는 일을 줄일 수 있다.
- primary_module: admin
- routes: /admin,/admin/products
- ui_surface: yes
- admin_surface: yes
- backend_changes: yes
- auth_required: no
- payment_required: no
- external_provider_impact: none
- analytics_required: no
- recommended: yes

## Testability Notes

- 이 작업은 랜딩, 온보딩, 추천, AI 설명, 상담 전환, 운영 화면, 이벤트, 상품 데이터 구조가 함께 바뀌므로 light work가 아니라 gated work로 다뤄야 한다.
- 첫 failing test 후보는 "이사 가능성, 예산, 필수 기능이 주어진 입력에서 룰 엔진이 부적합 상품을 제외하고 상위 3개를 반환한다"이다.
- 다음 behavior slice는 `온보딩 검증 -> 추천 룰 점수화 -> 결과 카드 필수 필드 노출 -> 상담 CTA 이벤트 기록 -> 관리자 노출` 순서로 자르는 것이 안전하다.
- 계약 요약 카드는 UI snapshot보다 필수 정보가 빠지지 않았는지와 해지 리스크 disclosure가 누락되지 않았는지를 기준으로 검증한다.

## Acceptance Criteria

- [ ] 사용자가 `/`에서 "계약을 대신 읽어주고 3개만 골라준다"는 가치를 이해하고 온보딩을 시작할 수 있다.
- [ ] 사용자가 7~9문항에 답하는 동안 진행률을 확인할 수 있고, 중간 이탈 뒤 돌아와도 이전 답변을 이어서 볼 수 있다.
- [ ] 온보딩 완료 후 사용자는 자신의 조건에 맞는 정확히 3개의 추천 결과를 본다.
- [ ] 각 추천 카드에는 월 납부액, 할인 종료 후 금액, 의무사용기간, 전체 계약기간, 총 예상 납부액, 관리 방식, 해지 주의 포인트, 추천 이유가 모두 보인다.
- [ ] 이사 가능성, 예산, 관리 선호, 필수 기능 같은 입력이 추천 결과에 실제로 반영되고, 필수 기능이 없는 상품은 결과에서 제외된다.
- [ ] 사용자가 결과 화면에서 카카오 상담, 폼 제출, 전화 예약 중 하나를 선택해 상담 요청을 남길 수 있다.
- [ ] 운영자가 `/admin` 또는 `/admin/leads`에서 추천 맥락과 상담 전환 신호를 확인할 수 있다.

## Analytics Impact

- 최소 `cta_clicked`, `onboarding_started`, `onboarding_completed`, `lead_form_submitted`, `recommendation_result_viewed`, `consultation_requested` 이벤트가 필요하다.
- `lead_form_submitted`에는 가구 수, 거주 형태, 이사 가능성, 예산 구간, 관리 선호, 필수 기능, 가장 걱정되는 점, 추천된 상품 ID 또는 추천 컨텍스트를 담는다.
- `consultation_requested`에는 선택 채널, 추천 결과 출처 여부, 선택 상품 ID를 담는다.
- 어드민에서 `landing -> onboarding -> result -> consult` 퍼널을 볼 수 있어야 한다.

## Data Impact

- 상품 스키마에는 브랜드, 모델명, 카테고리, 기본 월 렌탈료, 할인 월 렌탈료, 할인 적용 개월 수, 할인 종료 후 금액, 의무사용기간, 전체 계약기간, 총 예상 납부액, 관리 방식, 기능 태그, 공간 적합성, 이동 적합성, 해지 주의 포인트, 추천용 태그가 필요하다.
- 사용자 응답 스키마에는 가구 수, 거주 형태, 이사 가능성, 기능 요구, 예산, 관리 선호, 공간 여유, 우려 포인트가 필요하다.
- 추천 결과는 어떤 룰이 어떤 상품에 점수를 줬는지 추적하거나, 상담 단계로 안전하게 넘길 수 있는 snapshot 규칙이 필요하다.
- 관리자에서 SKU 20~30개를 수기 수정할 수 있어야 한다.
- 로컬 fallback 데이터와 seed도 새 필드를 반영해야 한다.
- [Unknown] 상담 전환 전까지 추천 결과를 서버에 저장할지, 세션 기반으로만 유지할지는 아직 미정이다.

## Dependencies

- 타깃 인터뷰 10명과 인터뷰 질문지 준비
- 정수기/공기청정기 SKU 20~30개 수집과 계약 조건 정리
- 카카오 상담 채널 또는 대체 상담 채널 운영 준비
- `apps/web/src/modules/landing/*`
- `apps/web/src/modules/lead/*`
- `apps/web/src/modules/consultation/*`
- `apps/web/src/modules/admin/*`
- `packages/core/*`
- `packages/db/*`
- `packages/analytics/*`

## Risks And Open Questions

### Risks

- AI만 있고 차별점이 약해 보일 수 있다. 코어는 데이터 구조화와 계약 요약이라는 점을 계속 드러내야 한다.
- 결국 가격 비교 서비스로 인식될 수 있다. 총비용, 의무기간, 해지 리스크를 랜딩 전면에 배치해야 한다.
- 상담 전환율이 낮을 수 있다. CTA는 "설치 가능 조건 확인하기"처럼 구체 행동 중심으로 설계해야 한다.
- 제휴처 확보가 늦어질 수 있다. 초기에는 수기 상담과 리드 검증을 먼저 돌리고 제휴는 병행 추진한다.
- 상품 정보 업데이트 부담이 클 수 있다. 관리자에서 수정 가능하게 설계하고 초기 SKU는 20~30개로 제한한다.

### Open Questions

- 첫 베타에 공기청정기까지 같이 넣을지, 정수기만 먼저 열지
- 상담 CTA의 기본값을 카카오로 둘지, 폼 제출로 둘지
- 재진입 상태를 세션 기준으로 저장할지, 브라우저 로컬 기준으로 저장할지
- 추천 이유 설명을 전부 AI로 쓸지, 구조화된 템플릿을 섞을지
- 계약 데이터 업데이트 주기를 주 단위로 둘지, 제휴 변경 시 수시 반영으로 둘지
- [Unknown] 첫 베타의 핵심 타깃을 1~2인 가구 개인 고객으로만 제한할지, 소형 사무실/매장도 함께 받을지

## Document History

| 날짜 | 유형 | 요약 | 작성자 |
| --- | --- | --- | --- |
| 2026-03-15 | created | Initial PRD created. | TBD |
| 2026-03-15 | updated | 모두의렌탈 첫 실제 제품 PRD와 feature candidates를 채움. | Codex |
| 2026-03-15 | updated | 킥오프 메모를 바탕으로 AI 추천 중개 MVP 범위, KPI, release plan을 정규화했다. | Codex |
| 2026-03-15 | updated | 중복 PRD를 정리하고 demand-validation 문서를 canonical source로 통합했다. | Codex |
| 2026-03-15 | updated | 첫 구현 slice가 정수기 public flow에 집중된다는 점을 release plan에 명시했다. | Codex |
