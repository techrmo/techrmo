import type { Keys } from '../../../../shared/constants/Keys';

import type { GetFormState, SetFormState } from '.';

import { DirectionInputToMove, createFormSlice } from './FormSlice';
import { createInputSlice } from './InputSlice';

export type RowColumnIndex = 0 | 1 | 2 | 3 | 4;

export interface InputFormSlice {
  updateCurrentInputAndValues: (
    input: HTMLInputElement | null,
    value: Keys | '',
    directionInputToMove: DirectionInputToMove
  ) => void;
  updateCurrentInputAndPosition: (
    input: HTMLInputElement | null,
    position: RowColumnIndex
  ) => void;
}

export const createInputFormSlice = (
  set: SetFormState,
  get: GetFormState
): InputFormSlice => ({
  updateCurrentInputAndValues: (
    input: HTMLInputElement | null,
    value: Keys | '',
    directionInputToMove: DirectionInputToMove
  ) => {
    const { currentInputElement } = get();

    if (currentInputElement) {
      currentInputElement.value = value;
    }

    input?.setAttribute('data-focused', 'true');

    createFormSlice(set, get).setValues(value, directionInputToMove);
    createInputSlice(set, get).setCurrentInputElement(input);
  },
  updateCurrentInputAndPosition: (
    input: HTMLInputElement | null,
    position: RowColumnIndex
  ) => {
    createInputSlice(set, get).setCurrentInputElement(input);
    createFormSlice(set, get).setCurrentColumnIndex(position);
  },
});
