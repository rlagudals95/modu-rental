# React Native Profit-App Base Kit (Expo)

수익형 앱 여러 개를 빠르게 만들기 위한 공통 스타터 키트.

## Included

- Expo Router 기반 구조
- 상태관리: Zustand
- 서버상태: TanStack Query
- HTTP: Axios
- 입력검증: Zod + React Hook Form
- 보안저장소: expo-secure-store
- 환경변수 템플릿: `.env.example`

## Verified on this machine

- Node.js: installed
- Homebrew: installed
- Watchman: installed
- Xcode: 26.2
- iOS Simulator Runtime: iOS 26.2
- CocoaPods: 1.16.2 (via Homebrew)
- Expo iOS run: validated

## Quick Start

```bash
cp .env.example .env
npm install
npx expo start --ios
```

## Environment Variables

`EXPO_PUBLIC_` prefix를 사용해야 런타임에서 접근 가능합니다.

- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_APP_ENV`
- `EXPO_PUBLIC_SENTRY_DSN`

## Key Files

- `src/config/env.ts` - env 읽기
- `src/api/client.ts` - axios client
- `src/providers/query-provider.tsx` - React Query provider
- `src/store/app-store.ts` - Zustand store
- `src/features/sample/use-health-query.ts` - sample query
- `app/(tabs)/index.tsx` - base dashboard

## Clone Strategy for Multiple Apps

1. 이 폴더를 복사해서 신규 앱 폴더 생성
2. `package.json`의 `name` 변경
3. `.env`의 API 주소 변경
4. `app.json` 앱 이름/번들ID 변경
5. 공통 모듈은 유지하고 도메인 기능만 추가

## Evidence

- Logs: `../setup-logs/`
- Screenshot: `../setup-logs/screenshots/testApp-ios-home.png`
