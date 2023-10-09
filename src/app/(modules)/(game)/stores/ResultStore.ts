import { createWithEqualityFn } from 'zustand/traditional';

import type { GameStatus } from '@/shared/constants/GameStatus';

interface State {
  status: GameStatus;
  statusBackup: GameStatus;
  response: string | null;
  explanations: string[];
}

interface Actions {
  changeResult: (data: Omit<State, 'statusBackup'>) => void;
  setResultBackupOnboarding: () => void;
  resetResultOnboarding: () => void;
}

export interface ResultStore extends State, Actions {}

const initialState: State = {
  status: 'PLAYING',
  statusBackup: 'PLAYING',
  explanations: [],
  response: null,
};

export const useResultStore = createWithEqualityFn<ResultStore>(
  (set, get) => ({
    ...initialState,
    changeResult: (data: Omit<State, 'statusBackup'>) => set(data),
    resetResultOnboarding: () =>
      set({
        statusBackup: 'PLAYING',
        status: get().statusBackup,
      }),
    setResultBackupOnboarding: () =>
      set({
        statusBackup: get().status,
        status: 'PLAYING',
      }),
  }),
  Object.is
);
