import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '랜덤 여행',
          headerTitle: '한국 랜덤 여행지',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="shuffle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '방문 기록',
          headerTitle: '방문한 여행지',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="checkmark.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
