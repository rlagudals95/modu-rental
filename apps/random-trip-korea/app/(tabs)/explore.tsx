import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTrip } from '@/src/features/trip/trip-context';

export default function VisitedScreen() {
  const { destinations, visitedIds, toggleVisited, clearVisited } = useTrip();

  const visitedPlaces = destinations.filter((destination) => visitedIds.includes(destination.id));

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText type="subtitle">방문 완료 {visitedPlaces.length}곳</ThemedText>
        {visitedPlaces.length > 0 && (
          <Pressable style={styles.clearButton} onPress={clearVisited}>
            <ThemedText style={styles.clearButtonText}>전체 초기화</ThemedText>
          </Pressable>
        )}
      </View>

      {visitedPlaces.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText>아직 방문한 여행지가 없어요.</ThemedText>
          <ThemedText style={styles.emptyHint}>랜덤 여행 탭에서 방문 완료를 눌러 기록해보세요.</ThemedText>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContent}>
          {visitedPlaces.map((place, index) => (
            <View key={place.id} style={styles.itemCard}>
              <ThemedText type="defaultSemiBold">
                {index + 1}. {place.name}
              </ThemedText>
              <ThemedText>{place.region}</ThemedText>
              <ThemedText style={styles.coords}>
                {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
              </ThemedText>
              <Pressable style={styles.uncheckButton} onPress={() => toggleVisited(place.id)}>
                <ThemedText style={styles.uncheckText}>방문 해제</ThemedText>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  clearButtonText: { color: 'white', fontWeight: '700' },
  emptyState: {
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
  },
  emptyHint: { opacity: 0.7 },
  listContent: { gap: 10, paddingBottom: 20 },
  itemCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9996',
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  coords: { opacity: 0.65 },
  uncheckButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uncheckText: { fontWeight: '600' },
});
