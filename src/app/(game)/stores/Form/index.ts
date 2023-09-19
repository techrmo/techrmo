import { persist } from 'zustand/middleware';
import { StoreApi, create } from 'zustand';
import nookies from 'nookies';

import { responseCookieAttempt } from '../../validators/responseWords';

import { type InputSlice, createInputSlice } from './InputSlice';
import { type FormSlice, createFormSlice } from './FormSlice';
import { type AttemptSlice, createAttemptSlice } from './AttemptSlice';
import { InputFormSlice, createInputFormSlice } from './InputFormSlice';

type UseForm = InputSlice & FormSlice & AttemptSlice & InputFormSlice;
export type SetFormState = StoreApi<UseForm>['setState'];
export type GetFormState = StoreApi<UseForm>['getState'];

interface Persist {
  resultsOfAttempts: any;
  values: any;
}

export const useFormStore = create<UseForm, [['zustand/persist', Persist]]>(
  persist(
    (set, get) => ({
      ...createInputSlice(set, get),
      ...createFormSlice(set, get),
      ...createAttemptSlice(set, get),
      ...createInputFormSlice(set, get),
    }),
    {
      name: 'current-attempt',
      storage: {
        getItem: (name) => {
          const currentAttemptString = nookies.get()[name];

          const currentAttempt = responseCookieAttempt.parse(
            currentAttemptString && JSON.parse(currentAttemptString)
          );

          const resultsOfAttempts = currentAttempt.map((current) =>
            current.map((item) => item.result)
          );
          const values = currentAttempt.map((current) =>
            current.map((item) => item.value)
          );

          return {
            state: {
              resultsOfAttempts,
              values,
            },
          };
        },
        setItem: (name, newValue) => {},
        removeItem: (name) => {},
      },
    }
  )
);
