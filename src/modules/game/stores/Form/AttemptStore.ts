import type { LetterResult, ResponseWord } from '../../validators/responseWords';
import type { GetFormState, SetFormState } from '.';
import type { RowColumnIndex } from './FormStore';

type Results = ResponseWord['results']

export interface AttemptStore {
  resultsOfAttempts: LetterResult[][];
  setResultsOfAttempts: (resultOfAttempt: Results) => void;
}

export const createAttemptStore = (
  (set: SetFormState, get: GetFormState): AttemptStore => ({
    resultsOfAttempts: [],
    setResultsOfAttempts: (resultOfAttempt: Results) => {
      const { resultsOfAttempts, currentRowIndex, values } = get();
      const mappedResult = resultOfAttempt.map((letter) => letter.result);

      set(() => ({
        currentRowIndex: currentRowIndex + 1 as RowColumnIndex,
        currentColumnIndex: 0,
        values: [...values, []],
        resultsOfAttempts: [...resultsOfAttempts, mappedResult],
      }));
    },
  })
);
