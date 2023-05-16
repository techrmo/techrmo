'use client';

import {
  Dispatch, ReactNode, SetStateAction,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './styles.module.scss';
import { type FormFields, inputSchema } from '../../validators/input';

interface InputRowProps {
  setAttemptNumber: Dispatch<SetStateAction<number>>;
  children: ReactNode;
}

const InputRow = ({ children, setAttemptNumber }: InputRowProps) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(inputSchema),
  });

  const handleAttempt = ({ value }: Pick<FormFields, 'value'>) => {
    console.log('value', value);
    setAttemptNumber((previousAttempt) => previousAttempt + 1);
    // methods.setValue('value.0', 'A');
    // // const attempt = value.join('');
  };

  return (
    <FormProvider {...methods}>
      <form
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
