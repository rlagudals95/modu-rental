# Testing Notes

- Unit: `packages/core`의 스키마 검증 로직 중심
- E2E Smoke: 핵심 경로 3개
  1. 랜딩 로드
  2. 상담폼 제출
  3. 어드민 리드 화면 렌더

향후 실제 DB 연결 시:
- test DB 분리
- seed/cleanup 전략 추가
