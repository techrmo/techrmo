import type { GetFormState, SetFormState } from '.';

export interface InputSlice {
  currentInputElement: HTMLInputElement | null;
  setCurrentInputElement: (input: HTMLInputElement | null) => void;
}

export const createInputSlice = (
  set: SetFormState,
  get: GetFormState
): InputSlice => ({
  currentInputElement: null,
  setCurrentInputElement: (input: HTMLInputElement | null) => {
    const { currentInputElement } = get();

    if (input) {
      currentInputElement?.removeAttribute('data-focused');
      set({ currentInputElement: input });
    }
  },
});
