import { create } from 'zustand';

interface InputStore {
  currentInput: HTMLInputElement | null;
  currentForm: string ;
  setCurrentInput: (input: HTMLInputElement | null) => void;
  setCurrentForm: (value: string) => void;
}

export const useInputStore = create<InputStore>((set) => ({
  currentInput: null,
  setCurrentInput: (input: HTMLInputElement | null) => set(() => ({ currentInput: input })),
  currentForm: '',
  setCurrentForm: (value: string) => set(() => ({ currentForm: value })),
}));
