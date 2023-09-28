import { createWithEqualityFn } from 'zustand/traditional';

interface State {
  isOpenOnboarding: boolean;
}

interface Actions {
  openOnboarding: () => void;
}

type OnboardingStore = Actions & State;

const initialState = {
  isOpenOnboarding: false,
};

export const useOnboardingStore = createWithEqualityFn<OnboardingStore>(
  (set, get) => ({
    ...initialState,
    openOnboarding: () => set({ isOpenOnboarding: !get().isOpenOnboarding }),
  }),
  Object.is
);
