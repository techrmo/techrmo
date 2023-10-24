import { ZodError } from 'zod';

import { delay } from '@/shared/helpers/delay';
import { useToastStore } from '@/shared/stores/toastStore';
import { blacklist } from '@/shared/data/blacklist';

import type {
  LetterResult,
  ResponseWord,
} from '../../validators/responseWords';
import { inputSchema } from '../../validators/input';
import { verifyWordService } from '../../services/verifyWordService';
import { useKeysStore } from '../KeysStore';
import { useResultStore } from '../ResultStore';
import { useFinishedDialogStore } from '../DialogFinishedStore';

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
    const { addToast } = useToastStore.getState();

    if (status !== 'PLAYING') {
      return;
    }

    const { currentValues, setResultsOfAttempts, resetState, wordSize } = get();
    try {
      const { setUsedKeys } = useKeysStore.getState();

      const parsedValues = inputSchema(wordSize).parse(currentValues());

      const isIncludeBlacklistWord = blacklist.some((word) =>
        parsedValues.join('').includes(word)
      );

      if (isIncludeBlacklistWord) {
        addToast({
          title: 'Opa, essa tentativa não é válida!',
          description: `Evite usar letras sequenciais ou termos inexistentes.`,
          variant: 'warning',
          duration: 5000,
        });

        return;
      }

      const {
        results: resultOfAttempt,
        status: resultStatus,
        explanations,
        response,
      } = await verifyWordService(parsedValues, wordSize);

      setUsedKeys(resultOfAttempt);
      setResultsOfAttempts(resultOfAttempt);

      if (resultStatus !== 'PLAYING' && explanations && response) {
        useResultStore.getState().changeResult({
          status: resultStatus,
          response,
          explanations,
        });
        useFinishedDialogStore.setState({ isOpen: true });
        resetState();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        addToast({
          title: 'Opa, vamos com calma!',
          description: `Você precisa digitar as ${wordSize} letras para realizar uma tentativa`,
          variant: 'warning',
          duration: 5000,
        });

        return;
      }

      addToast({
        title: 'Poxa, ocorreu um erro ao realizar a tentativa. ',
        description:
          'Tente atualizar a página e realizar a tentativa novamente.',
        variant: 'error',
        duration: 5000,
      });
      throw new Error('Algo de errado aconteceu na tentativa', {
        cause: error,
      });
    } finally {
      set({ isLoading: false, isBlockSend: false });
    }
  },
});
