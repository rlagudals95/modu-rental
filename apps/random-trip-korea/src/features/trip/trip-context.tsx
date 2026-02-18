import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { destinations, type Destination } from '@/src/data/destinations';

const VISITED_STORAGE_KEY = 'random-trip-korea/visited-v1';

type TripContextValue = {
  destinations: Destination[];
  visitedIds: string[];
  selectedDestination: Destination | null;
  loading: boolean;
  pickRandomDestination: () => void;
  toggleVisited: (destinationId: string) => void;
  isVisited: (destinationId: string) => boolean;
  clearVisited: () => void;
  remainingCount: number;
};

const TripContext = createContext<TripContextValue | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(VISITED_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as string[];
          setVisitedIds(parsed);
        }
      } catch (error) {
        console.warn('visited 로드 실패', error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const persistVisited = useCallback(async (next: string[]) => {
    setVisitedIds(next);
    try {
      await AsyncStorage.setItem(VISITED_STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn('visited 저장 실패', error);
    }
  }, []);

  const pickRandomDestination = useCallback(() => {
    const notVisited = destinations.filter((destination) => !visitedIds.includes(destination.id));
    const pool = notVisited.length > 0 ? notVisited : destinations;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setSelectedDestination(pool[randomIndex] ?? null);
  }, [visitedIds]);

  const toggleVisited = useCallback(
    (destinationId: string) => {
      const next = visitedIds.includes(destinationId)
        ? visitedIds.filter((id) => id !== destinationId)
        : [...visitedIds, destinationId];
      void persistVisited(next);
    },
    [persistVisited, visitedIds],
  );

  const isVisited = useCallback(
    (destinationId: string) => visitedIds.includes(destinationId),
    [visitedIds],
  );

  const clearVisited = useCallback(() => {
    void persistVisited([]);
  }, [persistVisited]);

  const remainingCount = useMemo(
    () => destinations.length - visitedIds.length,
    [visitedIds.length],
  );

  const value = useMemo(
    () => ({
      destinations,
      visitedIds,
      selectedDestination,
      loading,
      pickRandomDestination,
      toggleVisited,
      isVisited,
      clearVisited,
      remainingCount,
    }),
    [clearVisited, isVisited, loading, pickRandomDestination, remainingCount, selectedDestination, toggleVisited, visitedIds],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip은 TripProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
