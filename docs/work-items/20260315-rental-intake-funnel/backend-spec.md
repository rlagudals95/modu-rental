---
status: "approved"
owner_role: "be"
source_request: "PRD: docs/prds/modurent-demand-validation.md"
affected_paths:
  - "apps/web/src/modules/recommendation/actions/*"
  - "apps/web/src/modules/recommendation/model/*"
  - "apps/web/src/modules/consultation/actions/*"
  - "apps/web/src/modules/consultation/model/*"
  - "packages/core/src/schemas/*"
  - "packages/core/src/services/*"
  - "packages/core/src/fixtures/*"
  - "packages/db/src/schema/*"
  - "packages/db/src/client/*"
  - "packages/analytics/*"
dependencies:
  - "docs/work-items/20260315-rental-intake-funnel/brief.md"
  - "docs/work-items/20260315-rental-intake-funnel/frontend-spec.md"
skip_reason: null
---

# Backend Spec

## Schema And Validation Changes

- 새 public input schema로 `recommendationOnboardingInputSchema`를 추가한다.
- v1 input 필드는 아래 8개 추천 질문과 마지막 연락처 단계로 고정한다.
  - `householdSize`: `one | two | three_plus`
  - `housingType`: `owner | jeonse_monthly`
  - `movingWithinTwoYears`: `yes | no`
  - `requiredFeature`: `basic | hot | ice`
  - `monthlyBudgetBand`: `under_30k | 30k_to_50k | 50k_to_70k | above_70k`
  - `managementPreference`: `self | visit`
  - `installationSpace`: `narrow | standard`
  - `primaryConcern`: `price | maintenance | cancellation`
  - final contact: `name`, `phone`, optional `email`, `consent`
- `leadSchema`와 DB `leads` 테이블은 위 qualification 필드를 저장할 수 있게 확장한다.
- `productSchema`와 DB `products` 테이블은 추천 엔진이 쓰는 아래 필드를 갖는다.
  - `brand`
  - `category`
  - `discountedMonthlyFee`
  - `baseMonthlyFee`
  - `discountMonths`
  - `postDiscountMonthlyFee`
  - `mandatoryUseMonths`
  - `totalContractMonths`
  - `managementType`
  - `featureTags`
  - `sizeTag`
  - `capacityTag`
  - `movingFriendly`
  - `cancellationNotice`
  - `recommendedSummaryTemplate`
- `consultationRequestInputSchema`는 optional `leadId`, `selectedProductSlug`, `recommendationSource`를 받게 확장한다.
- `pageEventNameSchema`는 `onboarding_started`, `onboarding_completed`, `recommendation_result_viewed`를 추가한다.

## Action Service Repository Plan

- boundary validation은 `submit-recommendation-lead-action`과 `submit-consultation-request-action`에서 수행한다.
- `submitRecommendationLead` use case는 검증된 onboarding input을 받아 lead를 저장하고, 결과 route로 보낼 `leadId`를 반환한다.
- `ActionResult`는 그대로 두지 말고 recommendation 전용 result 타입을 만들어 `leadId`와 `nextPath`를 함께 반환한다.
- `getRecommendationResultForLead(leadId)` use case를 추가해 lead와 active products를 읽고 결과 카드를 조립한다.
- v1은 별도 recommendation draft table을 만들지 않는다. 추천 결과는 lead에 저장된 qualification 입력으로 서버에서 매번 재계산한다.
- repository에는 `findLeadById`, `listActiveProductsByCategory` 또는 동등한 read helper가 필요하다.
- consultation submit은 `leadId`가 있으면 기존 lead에 consultation request만 연결하고, 없으면 현재 fallback처럼 lead + consultation을 함께 만든다.

## Recommendation Rule Contract

- 이 slice의 public category는 `water_purifier` 하나로 고정한다.
- hard filter:
  - `product.stage === active`
  - `product.category === water_purifier`
  - `requiredFeature === hot`이면 `featureTags`에 `hot` 포함
  - `requiredFeature === ice`이면 `featureTags`에 `ice` 포함
- soft score:
  - 예산 cap 이하면 `+3`, cap 초과면 `-3`
  - `movingWithinTwoYears === yes` and `mandatoryUseMonths > 36`면 `-4`
  - `movingWithinTwoYears === yes` and `totalContractMonths > 60`면 `-2`
  - `movingWithinTwoYears === yes` and `movingFriendly === true`면 `+2`
  - 관리 선호 일치 시 `+3`, 불일치 시 `-1`
  - `householdSize === one` and `capacityTag === large`면 `-2`
  - `householdSize === three_plus` and `capacityTag === large`면 `+2`
  - `installationSpace === narrow` and `sizeTag === slim`이면 `+2`, 아니면 `-2`
  - `primaryConcern === price` and 예산 cap 이하이면 `+2`
  - `primaryConcern === maintenance` and 관리 선호 일치 시 `+2`
  - `primaryConcern === cancellation` and `mandatoryUseMonths <= 36`이면 `+2`
- tie-break:
  - score 내림차순
  - `discountedMonthlyFee` 오름차순
  - `mandatoryUseMonths` 오름차순
  - `slug` 오름차순
- 운영 전제:
  - 공개 노출하는 `requiredFeature` 옵션마다 active product가 최소 3개 있어야 한다.
  - 이 전제가 깨지면 옵션을 숨기거나 seed를 먼저 보강한다.

## Analytics Impact

- 내부 앱 이벤트:
  - `cta_clicked`: hero CTA, result CTA
  - `onboarding_started`: 첫 질문 진입 시 1회
  - `onboarding_completed`: 마지막 연락처 제출 성공 시 1회
  - `lead_form_submitted`: lead 저장 성공 시 1회
  - `recommendation_result_viewed`: `/result` 성공 렌더 시 1회
  - `consultation_requested`: consultation 저장 성공 시 1회
- `lead_form_submitted` payload:
  - `recommendationCategory`
  - `householdSize`
  - `housingType`
  - `movingWithinTwoYears`
  - `requiredFeature`
  - `monthlyBudgetBand`
  - `managementPreference`
  - `installationSpace`
  - `primaryConcern`
- `consultation_requested` payload:
  - `leadId`
  - `selectedProductSlug`
  - `consultationType`
  - `recommendationSource`
- Meta/Kakao/Google marketing 브리지는 `lead_form_submitted`, `consultation_requested`만 계속 쓴다.

## Failure Modes

- onboarding input validation 실패는 field error와 일반 메시지를 같이 반환한다.
- 존재하지 않는 `leadId`로 `/result` 또는 `/consult`에 들어오면 not-found empty state를 반환하고 500은 내지 않는다.
- 추천 후보가 3개 미만이면 사용자에게는 재시작 CTA를 보여주고, 내부에는 seed misconfiguration warning을 남긴다.
- analytics adapter 실패는 warning으로 로깅하고, lead/consult 저장은 성공으로 처리한다.
- v1 explainer는 deterministic template만 쓰므로 LLM provider failure mode는 없다.

## Boundary / Use Case / Repository Contract Test Plan

- 먼저 failing test로 `recommendationOnboardingInputSchema`의 필수 필드와 enum 검증을 고정한다.
- 다음으로 추천 엔진 contract test에서 `requiredFeature` hard filter, 이사 패널티, tie-break가 의도대로 동작하는지 고정한다.
- `submitRecommendationLeadAction` 성공 시 `leadId`와 `nextPath=/result?leadId=<id>`를 반환하는지 검증한다.
- `getRecommendationResultForLead`는 unknown `leadId`에서 empty result를 반환하고 throw 하지 않아야 한다.
- `submitConsultationRequest`는 `leadId`가 있는 경우 duplicate lead를 만들지 않고 consultation만 생성해야 한다.
- repository contract test는 local fallback과 DB 모드 모두에서 새 lead/product 필드가 round-trip 되는지 확인한다.
