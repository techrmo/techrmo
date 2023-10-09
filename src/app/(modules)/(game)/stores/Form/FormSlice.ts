import type { LetterResult } from '@/app/api/(services)/attempts/validators/attemptValues';

import type { Keys } from '../../../../../shared/constants/Keys';

import type { GetFormState, SetFormState } from '.';

export type RowColumnIndex = 0 | 1 | 2 | 3 | 4;
export type RowIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DirectionInputToMove = 'NEXT' | 'PREVIOUS';

export interface FormSliceStates {
  currentRowIndex: RowIndex;
  currentColumnIndex: RowColumnIndex;
  values: (Keys | '')[][];
  valuesOnboardingBackup: (Keys | '')[][];
  currentRowIndexBackup: RowIndex;
}
export interface FormSliceActions {
  setCurrentRowIndex: (value: RowColumnIndex) => void;
  setCurrentColumnIndex: (value: RowColumnIndex) => void;
  setValues: (
    value: Keys | '',
    directionInputToMove?: DirectionInputToMove
  ) => void;
  setFormOnboarding: (values: Keys[], letterResult?: LetterResult[]) => void;
  currentValues: () => void;
  setValuesBackupOnboarding: () => void;
  resetValuesOnboarding: () => void;
}
export type FormSlice = FormSliceStates & FormSliceActions;

export const allowedColumnIndexes = Object.freeze<RowColumnIndex[]>([
  0, 1, 2, 3, 4,
]);
export const allowedRowIndexes = Object.freeze<RowIndex[]>([
  0, 1, 2, 3, 4, 5, 6,
]);
const directionMapping = Object.freeze({
  NEXT: +1,
  PREVIOUS: -1,
});

const initialState: FormSliceStates = {
  currentRowIndex: 0,
  currentColumnIndex: 0,
  currentRowIndexBackup: 0,
  values: [[]],
  valuesOnboardingBackup: [[]],
};

export const createFormSlice = (
  set: SetFormState,
  get: GetFormState
): FormSlice => ({
  ...initialState,
  currentValues: () => {
    const { values, currentRowIndex } = get();

    return values[currentRowIndex];
  },
  resetValuesOnboarding: () =>
    set({
      resultsOfAttempts: get().resultsOfAttemptsOnboardingBackup,
      values: get().valuesOnboardingBackup,
      currentRowIndex: get().currentRowIndexBackup,
    }),
  setValuesBackupOnboarding: () =>
    set({
      resultsOfAttemptsOnboardingBackup: get().resultsOfAttempts,
      valuesOnboardingBackup: get().values,
      currentRowIndexBackup: get().currentRowIndex,
      values: [[]],
      resultsOfAttempts: [],
      currentRowIndex: 0,
    }),
  setFormOnboarding: (values: Keys[], letterResult: LetterResult[] = []) =>
    set({
      values: [values],
      resultsOfAttempts: [letterResult],
    }),
  setValues: (
    value: Keys | '',
    directionInputToMove?: DirectionInputToMove
  ) => {
    const { currentRowIndex, currentColumnIndex, values } = get();

    const newValue = [...values];
    const currentRow = newValue[currentRowIndex];

    if (currentRow) {
      currentRow[currentColumnIndex] = value;
    }

    let updateColumnIndex: number = currentColumnIndex;
    if (directionInputToMove) {
      updateColumnIndex =
        currentColumnIndex + directionMapping[directionInputToMove];
    }

    set(() => ({
      values: newValue,
      ...(updateColumnIndex !== undefined
        ? {
            currentColumnIndex:
              allowedColumnIndexes[updateColumnIndex] ?? currentColumnIndex,
          }
        : {}),
    }));
  },
  setCurrentRowIndex: (value: RowColumnIndex) =>
    set(() => ({ currentRowIndex: value })),
  setCurrentColumnIndex: (value: RowColumnIndex) =>
    set(() => ({ currentColumnIndex: value })),
});
