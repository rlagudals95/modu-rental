---
status: "approved"
owner_role: "pd"
source_request: "PRD: docs/prds/modurent-demand-validation.md"
affected_paths:
  - "apps/web/src/app/page.tsx"
  - "apps/web/src/app/result/page.tsx"
  - "apps/web/src/app/consult/page.tsx"
  - "apps/web/src/app/admin/leads/*"
  - "apps/web/src/app/admin/products/*"
  - "apps/web/src/modules/landing/*"
  - "apps/web/src/modules/recommendation/*"
  - "apps/web/src/modules/consultation/*"
  - "apps/web/src/modules/admin/*"
dependencies:
  - "docs/work-items/20260315-rental-intake-funnel/brief.md"
  - "docs/work-items/20260315-rental-intake-funnel/feature-spec.md"
skip_reason: null
---

# UX Review

## Entry Points

- `/`
- `/result?leadId=<id>`
- `/consult?leadId=<id>&productSlug=<slug>`
- `/admin`
- `/admin/leads`
- `/admin/products`

## Copy Changes

- Hero headline: `정수기 렌탈 계약, 대신 읽고 3개만 골라드립니다`
- Hero body는 `최저가`보다 `해지 리스크`, `의무사용기간`, `이사 적합성`을 앞세운다.
- Primary CTA: `내 조건으로 3개 추천받기`
- Result primary CTA: `카카오로 설치 가능 조건 확인하기`
- Result secondary CTA: `비교 결과 들고 상담 요청하기`
- 상담 화면은 "새 상담 폼"이 아니라 "추천 결과를 들고 넘어온 후속 단계"라는 맥락이 드러나야 한다.

## IA Changes

- `/`의 generic live lead form은 public surface에서 내리고, 대화형 온보딩이 첫 진입이 된다.
- `/result`를 랜딩과 상담 사이의 명시적 중간 단계로 추가한다.
- `/consult`는 standalone 진입도 허용하지만, `leadId`와 `productSlug`가 있으면 handoff mode로 동작한다.
- `/admin/leads`는 이름/연락처뿐 아니라 추천 입력 맥락과 상담 여부를 같이 보여준다.
- `/admin/products`는 편집 화면이 아니라 추천용 계약 데이터 점검 화면으로 유지한다.

## Happy Path

- 사용자가 랜딩 CTA를 눌러 정수기 추천 온보딩을 시작한다.
- 질문은 한 번에 하나씩 보이고 진행률이 함께 갱신된다.
- 마지막 단계에서 이름, 전화번호, 선택 이메일, 동의를 제출하면 결과 화면으로 이동한다.
- 결과 화면은 3개의 카드만 보여주고, 각 카드에 추천 이유와 해지 주의 포인트가 함께 보인다.
- 사용자가 카드별 CTA를 눌러 카카오 상담 또는 상담 요청 화면으로 이동한다.
- 상담 요청 화면은 선택 상품과 기존 입력 맥락을 이어받아 중복 입력을 줄인다.

## Edge States

- 각 단계의 필수 입력이 비어 있으면 다음 단계로 진행되지 않고, 현재 질문 아래에 오류 메시지를 노출한다.
- 새로고침 또는 브라우저 재방문 시 local draft가 있으면 "이어서 진행" 상태를 보여준다.
- `leadId`가 없거나 유효하지 않은 `/result` 진입은 500이 아니라 "다시 추천 시작" empty state로 처리한다.
- 추천 가능한 활성 상품이 3개 미만이면 일반 오류 대신 운영 이슈임을 감춘 사용자 메시지와 재시작 CTA를 보여준다.
- 상담 handoff 정보가 일부 없더라도 `/consult` 기본 폼은 정상 동작해야 한다.
- analytics 또는 optional marketing provider 실패는 사용자 메시지를 바꾸지 않는다.

## Accessibility Checks

- 질문 단계, 진행률, 제출 결과는 색만이 아니라 텍스트로도 구분된다.
- 키보드만으로 이전/다음 이동과 CTA 선택이 가능해야 한다.
- 단계 전환 시 포커스는 새 질문 heading 또는 첫 입력으로 이동해야 한다.
- 오류 메시지는 필드와 명시적으로 연결되어야 한다.
- 추천 카드 3개는 각자 heading과 CTA를 가져 스크린리더가 구분할 수 있어야 한다.
