# 랜덤 트립 코리아 (Expo MVP)

한국 여행지를 랜덤으로 추천하고, 방문한 장소를 지도/리스트로 관리하는 React Native Expo 앱입니다.

## 기능 요약

- 🇰🇷 **한국 지도 기반 화면** (Korean peninsula 중심)
- 🎲 **랜덤 여행지 뽑기**: 방문하지 않은 장소 우선 랜덤 추천
- 📍 **여행지 상세 카드**: 이름, 지역, 설명, 좌표 표시
- ✅ **방문 완료 토글**: 로컬 저장(AsyncStorage)으로 앱 재실행 후 유지
- 🗺️ **지도 마커 구분**: 방문 완료(초록), 미방문(빨강)
- 📋 **방문 기록 탭**: 방문한 여행지 목록 확인/해제/전체 초기화
- 🔁 **중복 방지 + fallback**: 미방문이 없으면 전체 목록에서 다시 랜덤 추천
- 🧳 **데이터셋 포함**: 전국 주요 지역 **80+개 여행지** 내장

## 기술 스택

- Expo SDK 54
- expo-router (탭 라우팅)
- react-native-maps
- @react-native-async-storage/async-storage
- TypeScript

## 프로젝트 구조

```bash
apps/random-trip-korea
├── app/(tabs)/index.tsx      # 지도 + 랜덤 추천
├── app/(tabs)/explore.tsx    # 방문 목록
├── src/data/destinations.ts  # 여행지 데이터셋 (80+)
└── src/features/trip/trip-context.tsx # 상태 + 로컬 저장
```

## 실행 방법

```bash
cd apps/random-trip-korea
npm install
npm run lint
npm run ios      # iOS 시뮬레이터
npm run android  # Android 에뮬레이터
npm run start    # Expo Dev Server
```

## 검증 로그

- 설치/린트/실행 관련 로그는 `setup-logs/` 아래에 저장했습니다.

## 알려진 제한사항

- `react-native-maps`는 디바이스/시뮬레이터 환경에 따라 지도 타일 로딩 속도 차이가 있을 수 있습니다.
- iOS/Android 시뮬레이터가 로컬에 준비되지 않은 환경에서는 실행 명령이 실패할 수 있습니다.
- MVP 버전이라 검색/필터/여행 계획 저장 기능은 미포함입니다.
