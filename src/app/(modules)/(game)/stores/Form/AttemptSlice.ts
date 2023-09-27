import { delay } from '@/shared/helpers/delay';

import type {
  LetterResult,
  ResponseWord,
} from '../../validators/responseWords';
import { inputSchema } from '../../validators/input';
import { verifyWord } from '../../services/wordsService';
import { useKeysStore } from '../KeysStore';
import { useResultStore } from '../ResultStore';

import type { GetFormState, SetFormState } from '.';

import type { RowColumnIndex } from './FormSlice';

type Results = ResponseWord['results'];

export const numberOfAttempts = 7;

export interface AttemptSlice {
  resultsOfAttempts: LetterResult[][];
  resultsOfAttemptsOnboardingBackup: LetterResult[][];
  setResultsOfAttempts: (resultOfAttempt: Results) => void;
  handleAttempt: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsBlockSend: (isBlockSend: boolean) => void;
  isBlockSend: boolean;
}

export const createAttemptSlice = (
  set: SetFormState,
  get: GetFormState
): AttemptSlice => ({
  resultsOfAttempts: [],
  resultsOfAttemptsOnboardingBackup: [],
  isLoading: false,
  isBlockSend: false,
  setResultsOfAttempts: (resultOfAttempt: Results) => {
    const { resultsOfAttempts, currentRowIndex, values } = get();
    const mappedResult = resultOfAttempt.map((letter) => letter.result);

    set(() => ({
      currentRowIndex: (currentRowIndex + 1) as RowColumnIndex,
      currentColumnIndex: 0,
      values: [...values, []],
      resultsOfAttempts: [...resultsOfAttempts, mappedResult],
    }));
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsBlockSend: (isBlockSend) => set({ isBlockSend }),
  handleSubmit: async () => {
    const { handleAttempt, isBlockSend, setIsBlockSend, setIsLoading } = get();
    setIsBlockSend(true);

    if (isBlockSend) {
      return;
    }

    const raceWinner = await Promise.race([delay(1000), handleAttempt()]);

    if (raceWinner === 'delay_finished') {
      setIsLoading(true);
    }
  },
  handleAttempt: async () => {
    const status = useResultStore.getState().status;

    if (status !== 'PLAYING') {
      return;
    }

    const { currentValues, setResultsOfAttempts, resetState } = get();
    try {
      const { setUsedKeys } = useKeysStore.getState();

      const parsedValues = inputSchema.parse(currentValues());
      const {
        results: resultOfAttempt,
        status: resultStatus,
        explanation,
      } = await verifyWord(parsedValues);

      setUsedKeys(resultOfAttempt);
      setResultsOfAttempts(resultOfAttempt);

      if (resultStatus !== 'PLAYING' && explanation) {
        useResultStore.getState().changeResult({
          status: resultStatus,
          response: resultOfAttempt.map((result) => result.value).join(''),
          explanation,
        });
        resetState();
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, isBlockSend: false });
    }
  },
});
