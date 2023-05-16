import { KeyboardEvent } from 'react';

import { useFormContext } from 'react-hook-form';

import { getAllowedElement } from '@/shared/helpers/hasElement';

import styles from './styles.module.scss';
import type { FormFields } from '@/modules/game/validators/input';

export type InputBoxVariant = 'disabled' | 'active' | 'incorrect' | 'correct' | 'bad-position'

export type InputBoxIndex = 0 | 1 | 2 | 3 | 4;

interface InputBoxProps {
  variant: InputBoxVariant;
  index: InputBoxIndex;
}

const InputBox = ({ variant, index }: InputBoxProps) => {
  const { register, setValue } = useFormContext<FormFields>();
  const inputName = `value.${index}` as const;

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
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
      className={styles.container}
      type='text'
      value=''
      data-variant={variant}
      disabled={variant !== 'active'}
      onKeyUp={handleKeyUp}
      {...register(inputName)}
    />
  );
};

export default InputBox;
