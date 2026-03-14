# 모두의렌탈 PMF Boilerplate

재사용 가능한 PMF(Product-Market Fit) 실험용 모노레포 스타터입니다.
첫 적용 도메인은 "모두의렌탈"(렌탈 리드 생성 + 상담 전환)이며, 구조는 다른 사이드프로젝트에도 재사용할 수 있게 설계했습니다.

## 핵심 스택

- Node 22
- pnpm workspaces + Turborepo
- Next.js(App Router) + TypeScript
- Supabase(Postgres/Auth), Drizzle ORM
- Tailwind CSS + shadcn/ui 스타일 기반 컴포넌트
- React Hook Form + Zod
- Vitest(unit) + Playwright(smoke E2E)
- Vercel 배포 타깃

## 빠른 시작

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

- 웹 앱: http://localhost:3000
- 헬스체크: http://localhost:3000/health

## 루트 스크립트

- `pnpm dev` - 로컬 개발
- `pnpm build` - 전체 빌드
- `pnpm lint` - 린트
- `pnpm typecheck` - 타입체크
- `pnpm test` - 유닛 테스트
- `pnpm test:e2e` - Playwright 스모크 테스트
- `pnpm format` - Prettier 포맷
- `pnpm db:generate` - Drizzle migration 생성
- `pnpm db:migrate` - migration 실행
- `pnpm db:seed` - 샘플 데이터 시드

## 폴더 구조

- `apps/web` - 메인 제품(랜딩, 상담, 관리자)
- `packages/ui` - 재사용 UI 컴포넌트
- `packages/core` - 도메인 타입, DTO, Zod 스키마
- `packages/db` - Drizzle 스키마/DB 클라이언트/시드
- `packages/analytics` - `track()` 추상화
- `packages/config-eslint` - 공통 ESLint 설정
- `packages/config-typescript` - 공통 TypeScript 설정
- `docs/` - 아키텍처 및 운영 문서

## 현재 구현된 기능

- Landing(`/`) + 리드 캡처 폼
- 상담 신청(`/consult`) 플로우
- Admin 페이지
  - `/admin/leads`
  - `/admin/products`
  - `/admin/experiments`
- 실험 레지스트리 뷰
- key action 트래킹(`lead_captured`, `consultation_requested`)

## 배포(Vercel)

1. Vercel에서 root를 repo 루트로 연결
2. Build command: `pnpm build`
3. Install command: `pnpm install`
4. 환경변수 등록(`.env.example` 참고)

## 로컬 데이터 전략

- 기본은 `apps/web/lib/mock-store.ts` 인메모리 저장소로 동작
- 실서비스 연결 시 `packages/db`의 Drizzle + Supabase Postgres를 사용

## 품질 게이트

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:e2e`

CI에서 위 4개를 최소 기준으로 실행합니다.
