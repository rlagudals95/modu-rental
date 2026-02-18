import { create } from 'zustand';

type AppState = {
  hasOnboarded: boolean;
  setOnboarded: (value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  hasOnboarded: false,
  setOnboarded: (value) => set({ hasOnboarded: value }),
}));
