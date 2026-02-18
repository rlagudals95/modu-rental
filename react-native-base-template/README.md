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
- `src/features/monetization/*` - 구독/광고 스켈레톤
- `app/(tabs)/index.tsx` - base dashboard

## Monetization Skeleton Included

- `subscription-service.ts`: 요금제 조회/구매 흐름 인터페이스
- `ads-service.ts`: 전면/리워드 광고 노출 정책 인터페이스

> 현재는 mock/stub 상태이며, 실제 SDK(RevenueCat, AdMob 등) 연결만 하면 바로 확장 가능.

## Clone Strategy for Multiple Apps

자동 복제 스크립트 사용:

```bash
./scripts/new-app.sh "My New App"
# or
./scripts/new-app.sh "My New App" ../apps
```

스크립트가 자동으로 처리:
1. 새 앱 폴더 생성
2. `package.json.name` 변경
3. `app.json`의 name/slug/scheme 변경
4. 기본 bundle id/package 템플릿 주입 (`com.yourcompany.*`)

생성 후 해야 할 일:
- `ios.bundleIdentifier`, `android.package`를 실제 값으로 수정
- `.env` API 주소 설정

## Evidence

- Logs: `../setup-logs/`
- Screenshot: `../setup-logs/screenshots/testApp-ios-home.png`
