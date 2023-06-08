import { type SetFormState } from '.';

export interface InputSlice {
  currentInputElement: HTMLInputElement | null;
  setCurrentInputElement: (input: HTMLInputElement | null) => void;
}

export const createInputSlice = ((set: SetFormState): InputSlice => ({
  currentInputElement: null,
  setCurrentInputElement:
    (input: HTMLInputElement | null) => {
      if (input) {
        set({ currentInputElement: input });
      }
    },
}));
