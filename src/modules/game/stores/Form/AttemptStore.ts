import type { LetterResult, ResponseWord } from '../../validators/responseWords';
import type { GetFormState, SetFormState } from '.';
import type { FormIndex } from './FormStore';

type Results = ResponseWord['results']

export interface AttemptStore {
  resultsOfAttempts: LetterResult[][];
  setResultsOfAttempts: (resultOfAttempt: Results) => void;
}

export const createAttemptStore = (
  (set: SetFormState, get: GetFormState): AttemptStore => ({
    resultsOfAttempts: [],
    setResultsOfAttempts: (resultOfAttempt: Results) => {
      const { resultsOfAttempts, currentFormIndex } = get();
      const mappedResult = resultOfAttempt.map((letter) => letter.result);

      set(() => ({
        resultsOfAttempts: [...resultsOfAttempts, mappedResult],
        currentFormIndex: currentFormIndex + 1 as FormIndex,
      }));
    },
  })
);
