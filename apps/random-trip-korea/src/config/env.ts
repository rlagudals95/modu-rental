import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const env = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.example.com',
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',

  rcAppleApiKey: process.env.EXPO_PUBLIC_RC_APPLE_API_KEY ?? '',
  rcGoogleApiKey: process.env.EXPO_PUBLIC_RC_GOOGLE_API_KEY ?? '',

  admobBannerIos: process.env.EXPO_PUBLIC_ADMOB_BANNER_IOS ?? '',
  admobBannerAndroid: process.env.EXPO_PUBLIC_ADMOB_BANNER_ANDROID ?? '',
  admobInterstitialIos: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_IOS ?? '',
  admobInterstitialAndroid: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ANDROID ?? '',
  admobRewardedIos: process.env.EXPO_PUBLIC_ADMOB_REWARDED_IOS ?? '',
  admobRewardedAndroid: process.env.EXPO_PUBLIC_ADMOB_REWARDED_ANDROID ?? '',

  appVersion: Constants.expoConfig?.version ?? '0.0.0',
  buildNumber: Constants.expoConfig?.ios?.buildNumber ?? extra.buildNumber ?? 'dev',
};
