import { createWithEqualityFn } from 'zustand/traditional';

import { useDialogStore } from '@/shared/stores/dialogStore';
import type { GameStatus } from '@/shared/constants/GameStatus';

interface State {
  status: GameStatus;
  response: string | null;
  explanation: string | null;
}

interface Actions {
  changeResult: (data: State) => void;
}

export interface ResultStore extends State, Actions {}

export const useResultStore = createWithEqualityFn<ResultStore>(
  (set) => ({
    status: 'PLAYING',
    explanation: null,
    response: null,
    changeResult: (data: State) => {
      useDialogStore.setState({ isOpen: true });
      set(data);
    },
  }),
  Object.is
);
