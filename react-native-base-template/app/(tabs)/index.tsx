import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { env } from '@/src/config/env';
import { showInterstitial, showRewarded } from '@/src/features/monetization/ads-service';
import { initRevenueCat } from '@/src/features/monetization/subscription-service';
import { useHealthQuery } from '@/src/features/sample/use-health-query';
import { useAppStore } from '@/src/store/app-store';

export default function HomeScreen() {
  const { hasOnboarded, setOnboarded } = useAppStore();
  const health = useHealthQuery();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profit App Base Kit</ThemedText>
      <ThemedText>Environment: {env.appEnv}</ThemedText>
      <ThemedText>API Base URL: {env.apiBaseUrl}</ThemedText>

      <View style={styles.card}>
        <ThemedText type="subtitle">App State (Zustand)</ThemedText>
        <ThemedText>Onboarded: {hasOnboarded ? 'Yes' : 'No'}</ThemedText>
        <Pressable style={styles.button} onPress={() => setOnboarded(!hasOnboarded)}>
          <ThemedText style={styles.buttonText}>Toggle Onboarding</ThemedText>
        </Pressable>
      </View>

      <View style={styles.card}>
        <ThemedText type="subtitle">API Health (React Query + Axios)</ThemedText>
        {health.isLoading && <ThemedText>Checking health...</ThemedText>}
        {health.isError && <ThemedText>Health check failed: {health.error.message}</ThemedText>}
        {health.data && <ThemedText>Status: {health.data.status}</ThemedText>}
      </View>

      <View style={styles.card}>
        <ThemedText type="subtitle">Monetization Smoke Test</ThemedText>
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => void initRevenueCat()}>
            <ThemedText style={styles.buttonText}>Init RevenueCat</ThemedText>
          </Pressable>
          <Pressable style={styles.button} onPress={() => void showInterstitial()}>
            <ThemedText style={styles.buttonText}>Show Interstitial</ThemedText>
          </Pressable>
          <Pressable style={styles.button} onPress={() => void showRewarded()}>
            <ThemedText style={styles.buttonText}>Show Rewarded</ThemedText>
          </Pressable>
        </View>
      </View>

      <ThemedText style={styles.hint}>
        AdMob/RevenueCat는 Expo Go가 아닌 Dev Client에서만 동작함.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 14,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#8884',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    backgroundColor: '#0A84FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  hint: {
    opacity: 0.7,
  },
});
