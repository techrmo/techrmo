import {
  Dispatch, ReactNode, SetStateAction, useRef,
} from 'react';

import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { useInputStore } from '@/modules/game/stores/InputStore';
import { type FormFields } from '@/modules/game/validators/input';
import { verifyWord } from '@/modules/game/services/wordsService';
import styles from './styles.module.scss';

import { type InputBoxIndex } from '../InputBox';

interface InputRowProps {
  setAttemptNumber: Dispatch<SetStateAction<number>>;
  index: InputBoxIndex;
  children: ReactNode;
}

const InputRow = ({
  children, setAttemptNumber, index,
}: InputRowProps) => {
  const { setResultsOfAttempts } = useInputStore((state) => state);
  const setUsedKeys = useKeysStore((state) => state.setUsedKeys);

  const formRef = useRef<HTMLFormElement>(null);

  const handleAttempt = async (event) => {
    event.preventDefault();
    const resultOfAttempt = await verifyWord(value);

    if (!resultOfAttempt) {
      return;
    }

    setUsedKeys(resultOfAttempt);
    setResultsOfAttempts(resultOfAttempt);
    setAttemptNumber((previousAttempt) => previousAttempt + 1);
  };

  return (
    <form
      id={`form-${index}`}
      ref={formRef}
      className={styles.container}
      onSubmit={handleAttempt}
    >
      {children}
      <input type='submit' />
    </form>
  );
};

export default InputRow;
