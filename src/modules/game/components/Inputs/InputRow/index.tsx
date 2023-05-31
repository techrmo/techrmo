import {
  Dispatch, ReactNode, SetStateAction, useRef,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { useInputStore } from '@/modules/game/stores/InputStore';
import { type FormFields, inputSchema } from '@/modules/game/validators/input';
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
  const methods = useForm<FormFields>({
    resolver: zodResolver(inputSchema),
  });

  const handleAttempt = async ({ value }: Pick<FormFields, 'value'>) => {
    const resultOfAttempt = await verifyWord(value);

    if (!resultOfAttempt) {
      return;
    }

    setUsedKeys(resultOfAttempt);
    setResultsOfAttempts(resultOfAttempt);
    setAttemptNumber((previousAttempt) => previousAttempt + 1);
  };

  return (
    <FormProvider {...methods}>
      <form
        id={`form-${index}`}
        ref={formRef}
        className={styles.container}
        onSubmit={methods.handleSubmit(handleAttempt)}
      >
        {children}
        <input type='submit' />
      </form>
    </FormProvider>
  );
};

export default InputRow;
