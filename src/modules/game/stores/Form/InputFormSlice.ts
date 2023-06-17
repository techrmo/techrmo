import type { GetFormState, SetFormState } from '.';
import type { Keys } from '../../components/Keyboard';
import { DirectionInputToMove, createFormSlice } from './FormSlice';
import { createInputSlice } from './InputSlice';

export type RowColumnIndex = 0 | 1 | 2 | 3 | 4;

export interface InputFormSlice {
  updateCurrentInputAndValues: (input: HTMLInputElement | null, value: Keys | '', directionInputToMove: DirectionInputToMove) => void,
}

export const createInputFormSlice = ((set: SetFormState, get: GetFormState): InputFormSlice => ({
  updateCurrentInputAndValues:
    (input: HTMLInputElement | null, value: Keys | '', directionInputToMove: DirectionInputToMove) => {
      createFormSlice(set, get).setValues(value, directionInputToMove);
      createInputSlice(set).setCurrentInputElement(input);
    },
}));
