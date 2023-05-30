import {
  Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getAllowedElement } from '@/shared/helpers/hasElement';
import { api } from '@/shared/services/api';
import { responseWords } from '@/modules/game/validators/responseWords';
import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { useInputStore } from '@/modules/game/stores/InputStore';
import { type FormFields, inputSchema } from '@/modules/game/validators/input';
import styles from './styles.module.scss';

import { type InputBoxIndex } from '../InputBox';

interface InputRowProps {
  setAttemptNumber: Dispatch<SetStateAction<number>>;
  attemptNumber: number;
  index: InputBoxIndex;
  children: (results: string[]) => ReactNode;
}

const InputRow = ({
  children, setAttemptNumber, attemptNumber, index,
}: InputRowProps) => {
  const setCurrentForm = useInputStore((state) => state.setCurrentForm);
  const setUsedKeys = useKeysStore((state) => state.setUsedKeys);
  const [results, setResults] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const methods = useForm<FormFields>({
    resolver: zodResolver(inputSchema),
  });

  useEffect(() => {
    setCurrentForm(`form-${attemptNumber}`);
    if (!formRef.current) {
      return;
    }

    const { nextElementSibling } = formRef.current;

    const nextForm = getAllowedElement(nextElementSibling, 'FORM');

    if (!nextForm?.children) {
      return;
    }

    const firstInputInForm = nextForm.children.item(0);

    const input = getAllowedElement(firstInputInForm, 'INPUT');

    input?.focus();
  }, [attemptNumber, setCurrentForm]);

  const handleAttempt = async ({ value }: Pick<FormFields, 'value'>) => {
    const response = await api.post('/words', { value });
    const { results: resultsApi } = responseWords.parse(response.data);

    setUsedKeys(resultsApi);
    setResults(resultsApi.map((letter) => letter.result));
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
        {children(results)}
        <input type='submit' />
      </form>
    </FormProvider>
  );
};

export default InputRow;
