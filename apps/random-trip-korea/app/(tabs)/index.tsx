import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTrip } from '@/src/features/trip/trip-context';

const KOREA_REGION = {
  latitude: 36.35,
  longitude: 127.85,
  latitudeDelta: 6.6,
  longitudeDelta: 5.5,
};

export default function RandomTripScreen() {
  const {
    destinations,
    selectedDestination,
    pickRandomDestination,
    isVisited,
    toggleVisited,
    remainingCount,
    visitedIds,
    loading,
  } = useTrip();

  const allVisited = useMemo(() => remainingCount === 0, [remainingCount]);

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <ThemedText>방문 기록 불러오는 중...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <MapView style={styles.map} initialRegion={KOREA_REGION}>
        {destinations.map((destination) => {
          const visited = isVisited(destination.id);
          return (
            <Marker
              key={destination.id}
              coordinate={{ latitude: destination.lat, longitude: destination.lng }}
              title={destination.name}
              description={destination.region}
              pinColor={visited ? '#22c55e' : '#ef4444'}
            />
          );
        })}
      </MapView>

      <ScrollView style={styles.panel} contentContainerStyle={styles.panelContent}>
        <View style={styles.counterRow}>
          <ThemedText type="defaultSemiBold">전체 {destinations.length}곳</ThemedText>
          <ThemedText>방문 {visitedIds.length}곳 · 남음 {remainingCount}곳</ThemedText>
        </View>

        <Pressable style={styles.primaryButton} onPress={pickRandomDestination}>
          <ThemedText style={styles.primaryButtonText}>랜덤 여행지 뽑기</ThemedText>
        </Pressable>

        {allVisited && (
          <View style={styles.noticeBox}>
            <ThemedText type="defaultSemiBold">모든 여행지를 방문했어요 🎉</ThemedText>
            <ThemedText style={styles.noticeText}>
              이제부터는 전체 목록에서 다시 랜덤으로 추천해드려요.
            </ThemedText>
          </View>
        )}

        {selectedDestination ? (
          <View style={styles.card}>
            <ThemedText type="subtitle">이번 추천 여행지</ThemedText>
            <ThemedText type="title" style={styles.destinationName}>
              {selectedDestination.name}
            </ThemedText>
            <ThemedText>{selectedDestination.region}</ThemedText>
            <ThemedText style={styles.description}>{selectedDestination.description}</ThemedText>
            <ThemedText style={styles.coordinates}>
              좌표: {selectedDestination.lat.toFixed(4)}, {selectedDestination.lng.toFixed(4)}
            </ThemedText>

            <Pressable
              style={[
                styles.secondaryButton,
                isVisited(selectedDestination.id) ? styles.visitedButton : styles.unvisitedButton,
              ]}
              onPress={() => toggleVisited(selectedDestination.id)}>
              <ThemedText style={styles.secondaryButtonText}>
                {isVisited(selectedDestination.id) ? '방문 해제하기' : '방문 완료로 표시'}
              </ThemedText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.card}>
            <ThemedText>버튼을 눌러 오늘의 랜덤 여행지를 추천받아보세요.</ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1.25 },
  panel: { flex: 1, paddingHorizontal: 16 },
  panelContent: { gap: 10, paddingVertical: 14, paddingBottom: 24 },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { color: 'white', fontWeight: '700' },
  card: {
    borderRadius: 14,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9996',
    gap: 8,
  },
  destinationName: { fontSize: 24 },
  description: { lineHeight: 20 },
  coordinates: { opacity: 0.7 },
  secondaryButton: {
    marginTop: 4,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  visitedButton: { backgroundColor: '#e2e8f0' },
  unvisitedButton: { backgroundColor: '#22c55e' },
  secondaryButtonText: { color: '#111827', fontWeight: '700' },
  noticeBox: {
    backgroundColor: '#ecfeff',
    borderColor: '#06b6d4',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 10,
    gap: 4,
  },
  noticeText: { opacity: 0.8 },
});
