import { StoreApi, create } from 'zustand';

import { type InputStore, createInputStore } from './InputStore';
import { type FormStore, createFormStore } from './FormStore';
import { type AttemptStore, createAttemptStore } from './AttemptStore';

type UseForm = InputStore & FormStore & AttemptStore;
export type SetFormState = StoreApi<UseForm>['setState'];
export type GetFormState = StoreApi<UseForm>['getState'];

export const useFormStore = create<UseForm>((set, get) => ({
  ...createInputStore(set),
  ...createFormStore(set),
  ...createAttemptStore(set, get),
}));
