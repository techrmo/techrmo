import type { GetFormState, SetFormState } from '.';
import type { Keys } from '../../components/Keyboard';

export type RowColumnIndex = 0 | 1 | 2 | 3 | 4;

export interface FormStore {
  currentRowIndex: RowColumnIndex,
  currentColumnIndex: RowColumnIndex,
  setCurrentRowIndex: (value: RowColumnIndex) => void;
  setValues: (value: Keys | '') => void;
  values: (Keys | '')[][]
}

export const createFormStore = ((set: SetFormState, get: GetFormState): FormStore => ({
  currentRowIndex: 0,
  currentColumnIndex: 0,
  values: [[]],
  setValues: (value: Keys | '') => set(
    () => {
      const { currentRowIndex, currentColumnIndex, values } = get();

      const newValue = [...values];
      const currentRow = newValue[currentRowIndex];

      if (currentRow) {
        currentRow[currentColumnIndex] = value;
      }

      return {
        values: newValue,
        currentColumnIndex: currentColumnIndex + 1 as RowColumnIndex,
      };
    },
  ),
  setCurrentRowIndex:
    (value: RowColumnIndex) => set(() => ({ currentRowIndex: value })),
}));
