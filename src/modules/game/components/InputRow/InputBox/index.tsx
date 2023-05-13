import { KeyboardEvent } from 'react';

import { useFormContext } from 'react-hook-form';
import { getAllowedElement } from '@/shared/helpers/hasElement';

import styles from './styles.module.scss';

export type InputBoxVariant = 'disabled' | 'active' | 'incorrect' | 'correct' | 'bad-position'

interface InputBoxProps {
  variant: InputBoxVariant;
  index: number;
}

const InputBox = ({ variant, index, handleTry }: InputBoxProps) => {
  const { register, setValue, handleSubmit } = useFormContext();
  const inputName = `inputs.${index}.value`;

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(handleTry)();
      return;
    }

    event.preventDefault();

    // event.

    const { key } = event;
    const { previousElementSibling, nextElementSibling } = event.currentTarget;

    const isLetterKey = /^[a-zA-Z]$/.test(key);
    const isArrowLeftKey = key === 'ArrowLeft';
    const isArrowRightKey = key === 'ArrowRight';
    const isBackSpaceKey = key === 'Backspace';
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (isLetterKey) {
      setValue(inputName, key.toLocaleUpperCase());
    }
    if (isBackSpaceKey) {
      setValue(inputName, '');
    }

    if (isLetterKey || isArrowRightKey) {
      nextInput?.focus();
    }

    if (isBackSpaceKey || isArrowLeftKey) {
      previousInput?.focus();
    }
  };

  return (
    <input
      type='text'
      className={styles.container}
      disabled={variant !== 'active'}
      data-variant={variant}
      onKeyDown={(event) => handleKeyUp(event)}
      {...register(inputName)}
    />
  );
};

export default InputBox;
