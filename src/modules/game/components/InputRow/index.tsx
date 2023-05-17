import {
  Dispatch, ReactNode, SetStateAction, useEffect, useRef,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getAllowedElement } from '@/shared/helpers/hasElement';
import styles from './styles.module.scss';
import { type FormFields, inputSchema } from '../../validators/input';

interface InputRowProps {
  setAttemptNumber: Dispatch<SetStateAction<number>>;
  attemptNumber: number;
  children: ReactNode;
}

const InputRow = ({ children, setAttemptNumber, attemptNumber }: InputRowProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const methods = useForm<FormFields>({
    resolver: zodResolver(inputSchema),
  });

  useEffect(() => {
    if (!formRef.current) {
      return;
    }

    const { nextElementSibling } = formRef.current;

    const nextForm = getAllowedElement(nextElementSibling, 'FORM');
    const firstInputInForm = nextForm?.children?.item(0);

    const input = getAllowedElement(firstInputInForm, 'INPUT');

    input?.focus();
  }, [attemptNumber]);

  const handleAttempt = ({ value }: Pick<FormFields, 'value'>) => {
    console.info(value);
    setAttemptNumber((previousAttempt) => previousAttempt + 1);
  };

  return (
    <FormProvider {...methods}>
      <form
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
