import type { LetterResult } from '@/app/api/(services)/attempts/validators/attemptValues';

import type { Keys } from '../../../../../shared/constants/Keys';

import type { GetFormState, SetFormState } from '.';

export type RowColumnIndex = 0 | 1 | 2 | 3 | 4;
export type DirectionInputToMove = 'NEXT' | 'PREVIOUS';

export interface FormSlice {
  currentRowIndex: RowColumnIndex;
  currentColumnIndex: RowColumnIndex;
  setCurrentRowIndex: (value: RowColumnIndex) => void;
  setCurrentColumnIndex: (value: RowColumnIndex) => void;
  setValues: (
    value: Keys | '',
    directionInputToMove: DirectionInputToMove
  ) => void;
  setFormOnboarding: (values: Keys[], letterResult: LetterResult[]) => void;
  currentValues: () => void;
  values: (Keys | '')[][];
}

export const allowedColumnIndexes = Object.freeze<RowColumnIndex[]>([
  0, 1, 2, 3, 4,
]);
const directionMapping = Object.freeze({
  NEXT: +1,
  PREVIOUS: -1,
});

export const createFormSlice = (
  set: SetFormState,
  get: GetFormState
): FormSlice => ({
  currentRowIndex: 0,
  currentColumnIndex: 0,
  values: [[]],
  currentValues: () => {
    const { values, currentRowIndex } = get();

    return values[currentRowIndex];
  },
  setFormOnboarding: (values: Keys[], letterResult?: LetterResult[]) =>
    set({
      values: [values],
      ...(letterResult ? { resultsOfAttempts: [letterResult] } : {}),
    }),
  setValues: (value: Keys | '', directionInputToMove: DirectionInputToMove) => {
    const { currentRowIndex, currentColumnIndex, values } = get();

    const newValue = [...values];
    const currentRow = newValue[currentRowIndex];

    if (currentRow) {
      currentRow[currentColumnIndex] = value;
    }

    const updateColumnIndex =
      currentColumnIndex + directionMapping[directionInputToMove];

    set(() => ({
      values: newValue,
      currentColumnIndex:
        allowedColumnIndexes[updateColumnIndex] ?? currentColumnIndex,
    }));
  },
  setCurrentRowIndex: (value: RowColumnIndex) =>
    set(() => ({ currentRowIndex: value })),
  setCurrentColumnIndex: (value: RowColumnIndex) =>
    set(() => ({ currentColumnIndex: value })),
});
