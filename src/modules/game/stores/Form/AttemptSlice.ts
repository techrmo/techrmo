import { delay } from '@/shared/helpers/delay';

import type {
  LetterResult,
  ResponseWord,
} from '../../validators/responseWords';
import { inputSchema } from '../../validators/input';
import { verifyWord } from '../../services/wordsService';
import { useKeysStore } from '../KeysStore';

import type { GetFormState, SetFormState } from '.';

import type { RowColumnIndex } from './FormSlice';

type Results = ResponseWord['results'];

export const numberOfAttempts = 5;

export interface AttemptSlice {
  resultsOfAttempts: LetterResult[][];
  setResultsOfAttempts: (resultOfAttempt: Results) => void;
  handleAttempt: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsBlockSend: (isBlockSend: boolean) => void;
  isBlockSend: boolean;
  isWinner: boolean;
  isLost: boolean;
}

export const createAttemptSlice = (
  set: SetFormState,
  get: GetFormState
): AttemptSlice => ({
  resultsOfAttempts: [],
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
  isLoading: false,
  isBlockSend: false,
  isWinner: false,
  isLost: false,
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
    const { currentValues, setResultsOfAttempts, resultsOfAttempts } = get();
    try {
      const { setUsedKeys } = useKeysStore.getState();

      const parsedValues = inputSchema.parse(currentValues());
      const resultOfAttempt = await verifyWord(parsedValues);

      setUsedKeys(resultOfAttempt);
      setResultsOfAttempts(resultOfAttempt);

      const isWinner = resultOfAttempt.every(
        (result) => result.result === 'correct'
      );

      if (isWinner) {
        set({ isWinner: true });
        return;
      }

      if (resultsOfAttempts.length === numberOfAttempts - 1) {
        set({ isLost: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, isBlockSend: false });
    }
  },
});
