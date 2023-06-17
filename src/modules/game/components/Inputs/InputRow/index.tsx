import {
  FormEvent, ReactNode, useRef, useState,
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

const InputRow = ({
  children, index,
}: InputRowProps) => {
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const raceWinner = await Promise.race([
      delay(1000),
      handleAttempt(),
    ]);

    if (raceWinner === 'delay_finished') {
      setLoading(true);
    }
  };

  return (
    <>
      <LoadingUI isLoading={loading} />
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
