import { create } from 'zustand';

import type { LetterResult, ResponseWord } from '../validators/responseWords';

type FormIndex = 0 | 1 | 2 | 3 | 4;
interface InputStore {
  currentInputElement: HTMLInputElement | null;
  currentFormIndex: FormIndex;
  resultsOfAttempts: LetterResult[][];
  setCurrentInputElement: (input: HTMLInputElement | null) => void;
  setCurrentFormIndex: (value: FormIndex) => void;
  setResultsOfAttempts: (resultOfAttempt: ResponseWord['results']) => void;
}

export const useInputStore = create<InputStore>((set, get) => ({
  currentInputElement: null,
  currentFormIndex: 0,
  resultsOfAttempts: [],
  setCurrentInputElement:
    (input: HTMLInputElement | null) => set(() => ({ currentInputElement: input })),
  setCurrentFormIndex:
    (value: FormIndex) => set(() => ({ currentFormIndex: value })),
  setResultsOfAttempts:
    (resultOfAttempt: ResponseWord['results']) => {
      
      const { resultsOfAttempts, currentFormIndex } = get();
      const mappedResult = resultOfAttempt.map((letter) => letter.result);

      set(() => ({
        resultsOfAttempts: [...resultsOfAttempts, mappedResult],
        currentFormIndex: currentFormIndex + 1 as FormIndex,
      }));
    },
}));
