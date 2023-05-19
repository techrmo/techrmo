import { create } from 'zustand';

interface InputStore {
  currentInput: HTMLInputElement | null;
  setCurrentInput: (input: HTMLInputElement | null) => void;
}

export const useInputStore = create<InputStore>((set) => ({
  currentInput: null,
  setCurrentInput: (input: HTMLInputElement | null) => set(() => ({ currentInput: input })),
}));
