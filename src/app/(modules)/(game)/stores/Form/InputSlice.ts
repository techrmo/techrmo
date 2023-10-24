import type { GetFormState, SetFormState } from '.';

export interface InputSliceStates {
  currentInputElement: HTMLInputElement | null;
}
export interface InputSliceActions {
  setCurrentInputElement: (input: HTMLInputElement | null) => void;
  resetState: () => void;
}
export type InputSlice = InputSliceStates & InputSliceActions;

const initialState: InputSliceStates = {
  currentInputElement: null,
};

export const createInputSlice = (
  set: SetFormState,
  get: GetFormState
): InputSlice => ({
  ...initialState,
  setCurrentInputElement: (input: HTMLInputElement | null) => {
    const { currentInputElement } = get();

    if (input) {
      currentInputElement?.removeAttribute('data-focused');
      set({ currentInputElement: input });
    }
  },
  resetState: () => {
    const { currentInputElement } = get();

    currentInputElement?.removeAttribute('data-focused');

    set(initialState);
  },
});
