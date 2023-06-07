import { FormEvent, ReactNode, useRef } from 'react';

import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { verifyWord } from '@/modules/game/services/wordsService';

import { useFormStore } from '@/modules/game/stores/Form';

import { inputSchema } from '@/modules/game/validators/input';
import type { RowColumnIndex } from '@/modules/game/stores/Form/FormStore';

import styles from './styles.module.scss';

interface InputRowProps {
  index: RowColumnIndex;
  children: ReactNode;
}

const InputRow = ({
  children, index,
}: InputRowProps) => {
  const { setResultsOfAttempts, values, currentRowIndex } = useFormStore((state) => state);
  const setUsedKeys = useKeysStore((state) => state.setUsedKeys);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAttempt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const parsedValues = inputSchema.parse(values[currentRowIndex]);
      const resultOfAttempt = await verifyWord(parsedValues);

      setUsedKeys(resultOfAttempt);
      setResultsOfAttempts(resultOfAttempt);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      id={`form-${index}`}
      ref={formRef}
      className={styles.container}
      onSubmit={handleAttempt}
    >
      {children}
    </form>
  );
};

export default InputRow;
