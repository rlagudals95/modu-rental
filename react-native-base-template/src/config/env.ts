import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const env = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.example.com',
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  appVersion: Constants.expoConfig?.version ?? '0.0.0',
  buildNumber: Constants.expoConfig?.ios?.buildNumber ?? extra.buildNumber ?? 'dev',
};
