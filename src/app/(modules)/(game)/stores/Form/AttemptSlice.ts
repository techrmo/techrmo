import { delay } from '@/shared/helpers/delay';

import type {
  LetterResult,
  ResponseWord,
} from '../../validators/responseWords';
import { inputSchema } from '../../validators/input';
import { verifyWordService } from '../../services/verifyWordService';
import { useKeysStore } from '../KeysStore';
import { useResultStore } from '../ResultStore';

import type { GetFormState, SetFormState } from '.';

import type { RowColumnIndex } from './FormSlice';

type Results = ResponseWord['results'];

export const numberOfAttempts = 7;

interface AttemptSliceState {
  resultsOfAttempts: LetterResult[][];
  resultsOfAttemptsOnboardingBackup: LetterResult[][];
  isLoading: boolean;
  isBlockSend: boolean;
}

export interface AttemptSliceActions {
  setResultsOfAttempts: (resultOfAttempt: Results) => void;
  handleAttempt: () => Promise<void>;
  handleSubmit: () => Promise<void>;

  setIsLoading: (isLoading: boolean) => void;
  setIsBlockSend: (isBlockSend: boolean) => void;
}
export type AttemptSlice = AttemptSliceState & AttemptSliceActions;

const initialState: AttemptSliceState = {
  resultsOfAttempts: [],
  resultsOfAttemptsOnboardingBackup: [],
  isLoading: false,
  isBlockSend: false,
};

export const createAttemptSlice = (
  set: SetFormState,
  get: GetFormState
): AttemptSlice => ({
  ...initialState,
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
        explanations,
      } = await verifyWordService(parsedValues);

      setUsedKeys(resultOfAttempt);
      setResultsOfAttempts(resultOfAttempt);

      if (resultStatus !== 'PLAYING' && explanations) {
        useResultStore.getState().changeResult({
          status: resultStatus,
          response: resultOfAttempt.map((result) => result.value).join(''),
          explanations,
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
