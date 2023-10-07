import { StoreApi } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';

import { ResultStore, useResultStore } from '../ResultStore';
import { KeyResult, useKeysStore } from '../KeysStore';

import { type InputSlice, createInputSlice } from './InputSlice';
import { type FormSlice, createFormSlice } from './FormSlice';
import { type AttemptSlice, createAttemptSlice } from './AttemptSlice';
import { InputFormSlice, createInputFormSlice } from './InputFormSlice';

type UseForm = InputSlice & FormSlice & AttemptSlice & InputFormSlice;

export type InitialStoreForm = Partial<UseForm> &
  Omit<ResultStore, 'changeResult'> & { keyResult: KeyResult[] };
interface UseFormStoreActions {
  setInitialState: (data: InitialStoreForm) => void;
}

export type SetFormState = StoreApi<UseForm>['setState'];
export type GetFormState = StoreApi<UseForm>['getState'];

export const useFormStore = createWithEqualityFn<UseForm & UseFormStoreActions>(
  (set, get) => ({
    ...createInputSlice(set, get),
    ...createFormSlice(set, get),
    ...createAttemptSlice(set, get),
    ...createInputFormSlice(set, get),
    setInitialState: ({
      response,
      status,
      explanations,
      keyResult,
      ...store
    }) => {
      useResultStore.getState().changeResult({
        response,
        status,
        explanations,
      });
      useKeysStore.getState().setUsedKeys(keyResult);

      set(store);
    },
  }),
  Object.is
);
