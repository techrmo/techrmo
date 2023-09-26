import { create } from 'zustand';

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

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialState,
  openOnboarding: () => set({ isOpenOnboarding: !get().isOpenOnboarding }),
}));
