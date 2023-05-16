import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import InputBox, { InputBoxIndex, type InputBoxVariant } from './InputBox';

import styles from './styles.module.scss';
import { type FormFields, inputSchema } from '../../validators/input';

const InputRow = () => {
  const [variant, setVariant] = useState<InputBoxVariant>('active');
  const word = 'ALVES';

  const numberOfInputs = 5;
  const methods = useForm<FormFields>({
    resolver: zodResolver(inputSchema),
  });

  const handleAttempt = ({ value }: Pick<FormFields, 'value'>) => {
    const attempt = value.join('');

    setVariant(attempt === word ? 'correct' : 'incorrect');
  };

  const inputsBox = Array
    .from({ length: numberOfInputs })
    .map((_, index) => (
      <InputBox
        key={crypto.randomUUID()}
        index={index as InputBoxIndex}
        variant={variant}
      />
    ));

  return (
    <FormProvider {...methods}>
      <form
        className={styles.container}
        onSubmit={methods.handleSubmit(handleAttempt)}
      >
        {inputsBox}
        <input type='submit' />
      </form>
    </FormProvider>
  );
};

export default InputRow;
