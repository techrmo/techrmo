import { type SetFormState } from '.';

export interface InputStore {
  currentInputElement: HTMLInputElement | null;
  setCurrentInputElement: (input: HTMLInputElement | null) => void;
}

export const createInputStore = ((set: SetFormState): InputStore => ({
  currentInputElement: null,
  setCurrentInputElement:
    (input: HTMLInputElement | null) => set(
      () => ({ currentInputElement: input }),
    ),
}));
