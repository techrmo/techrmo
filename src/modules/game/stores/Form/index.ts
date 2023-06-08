import { StoreApi, create } from 'zustand';

import { type InputSlice, createInputSlice } from './InputSlice';
import { type FormSlice, createFormSlice } from './FormSlice';
import { type AttemptSlice, createAttemptSlice } from './AttemptSlice';
import { InputFormSlice, createInputFormSlice } from './InputFormSlice';

type UseForm = InputSlice & FormSlice & AttemptSlice & InputFormSlice;
export type SetFormState = StoreApi<UseForm>['setState'];
export type GetFormState = StoreApi<UseForm>['getState'];

export const useFormStore = create<UseForm>((set, get) => ({
  ...createInputSlice(set),
  ...createFormSlice(set, get),
  ...createAttemptSlice(set, get),
  ...createInputFormSlice(set, get),
}));
