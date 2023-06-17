import {
  FormEvent, ReactNode, useReducer, useRef,
} from 'react';

import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { verifyWord } from '@/modules/game/services/wordsService';

import { useFormStore } from '@/modules/game/stores/Form';

import { inputSchema } from '@/modules/game/validators/input';
import LoadingUI from '@/shared/components/LoadingUI';
import { delay } from '@/shared/helpers/delay';
import type { RowColumnIndex } from '@/modules/game/stores/Form/FormSlice';

import styles from './styles.module.scss';

interface InputRowProps {
  index: RowColumnIndex;
  children: ReactNode;
}

interface SubmitState {
  isLoading: boolean,
  isBlockSend: boolean,
}

interface FormStateAction {
  type: 'block' | 'loading' | 'finished';
  payload?: SubmitState;
}

const initialState = {
  isLoading: false,
  isBlockSend: false,
};

function reducer(state: SubmitState, action: FormStateAction) {
  switch (action.type) {
    case 'block':
      return { ...state, isBlockSend: true };
    case 'loading':
      return { ...state, isLoading: true };
    case 'finished':
      return initialState;
    default:
      throw new Error();
  }
}

const InputRow = ({
  children, index,
}: InputRowProps) => {
  const [stateSubmit, dispatchSubmit] = useReducer(reducer, initialState);
  const currentValues = useFormStore((state) => state.currentValues);
  const setResultsOfAttempts = useFormStore((state) => state.setResultsOfAttempts);
  const setUsedKeys = useKeysStore((state) => state.setUsedKeys);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAttempt = async () => {
    try {
      const parsedValues = inputSchema.parse(currentValues());
      const resultOfAttempt = await verifyWord(parsedValues);

      setUsedKeys(resultOfAttempt);
      setResultsOfAttempts(resultOfAttempt);
    } catch (error) {
      console.error(error);
    } finally {
      dispatchSubmit({ type: 'finished' });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchSubmit({ type: 'block' });

    if (stateSubmit.isBlockSend) {
      return;
    }

    const raceWinner = await Promise.race([
      delay(1000),
      handleAttempt(),
    ]);

    if (raceWinner === 'delay_finished') {
      dispatchSubmit({ type: 'loading' });
    }
  };

  return (
    <>
      <LoadingUI isLoading={stateSubmit.isLoading} />
      <form
        id={`form-${index}`}
        ref={formRef}
        className={styles.container}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </>
  );
};

export default InputRow;
