import { create } from 'zustand';

interface State {
  status: 'WINNER' | 'LOST' | 'IN-GAME';
  response: string | null;
}

interface Actions {
  changeResult: (data: State) => void;
}

interface ResultStore extends State, Actions {}

export const useResultStore = create<ResultStore>((set) => ({
  status: 'IN-GAME',
  response: null,
  changeResult: (data: State) => set(data),
}));
