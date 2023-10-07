import { createWithEqualityFn } from 'zustand/traditional';

import { useFinishedDialogStore } from '@/app/(modules)/(game)/stores/DialogFinishedStore';
import type { GameStatus } from '@/shared/constants/GameStatus';

interface State {
  status: GameStatus;
  response: string | null;
  explanations: string[];
}

interface Actions {
  changeResult: (data: State) => void;
}

export interface ResultStore extends State, Actions {}

const initialState: State = {
  status: 'PLAYING',
  explanations: [],
  response: null,
};

export const useResultStore = createWithEqualityFn<ResultStore>(
  (set) => ({
    ...initialState,
    changeResult: (data: State) => {
      useFinishedDialogStore.setState({ isOpen: true });
      set(data);
    },
  }),
  Object.is
);
