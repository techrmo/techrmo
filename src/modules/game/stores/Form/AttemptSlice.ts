import type { LetterResult, ResponseWord } from '../../validators/responseWords';
import type { GetFormState, SetFormState } from '.';
import type { RowColumnIndex } from './FormSlice';

type Results = ResponseWord['results']

export interface AttemptSlice {
  resultsOfAttempts: LetterResult[][];
  setResultsOfAttempts: (resultOfAttempt: Results) => void;
}

export const createAttemptSlice = (
  (set: SetFormState, get: GetFormState): AttemptSlice => ({
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
