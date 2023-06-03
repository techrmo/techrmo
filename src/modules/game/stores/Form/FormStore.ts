import { type SetFormState } from '.';

export type FormIndex = 0 | 1 | 2 | 3 | 4;

export interface FormStore {
  currentFormIndex: FormIndex;
  setCurrentFormIndex: (value: FormIndex) => void;
}

export const createFormStore = ((set: SetFormState): FormStore => ({
  currentFormIndex: 0,
  setCurrentFormIndex:
    (value: FormIndex) => set(() => ({ currentFormIndex: value })),
}));
