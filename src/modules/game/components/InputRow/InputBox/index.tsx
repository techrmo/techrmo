import { KeyboardEvent } from 'react';

import { useFormContext } from 'react-hook-form';

import { getAllowedElement } from '@/shared/helpers/hasElement';

import type { FormFields } from '@/modules/game/validators/input';

import styles from './styles.module.scss';

export type InputBoxVariant = 'disabled' | 'active' | 'incorrect' | 'correct' | 'bad-position'

interface InputBoxProps {
  variant: InputBoxVariant;
  index: 0 | 1 | 2 | 3 | 4;
}

const InputBox = ({ variant, index }: InputBoxProps) => {

  const { register, setValue} = useFormContext<FormFields>();
  const inputName = `value.${index}` as const

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {

    const { key } = event;
    const { previousElementSibling, nextElementSibling } = event.currentTarget;

    const isLetterKey = /^[a-zA-Z]$/.test(key);
    const isArrowLeftKey = key === 'ArrowLeft';
    const isArrowRightKey = key === 'ArrowRight';
    const isBackSpaceKey = key === 'Backspace';
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if(!isLetterKey && key !== "Enter") {
      event.preventDefault()
      setValue(inputName, '')
    }

    if (isLetterKey) {
      event.preventDefault()
      setValue(inputName, key.toLocaleUpperCase());
    }
    
    if (isBackSpaceKey) {
      event.preventDefault()
      setValue(inputName, '');
    }

    if (isLetterKey || isArrowRightKey) {
      nextInput?.focus();
    }
    
    if (isBackSpaceKey || isArrowLeftKey) {
      previousInput?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const {key} = event

    if(key !== "Enter") {
      event.preventDefault()
    }
  }
  
  return (
    <input
    className={styles.container}
      type='text'
      data-variant={variant}
      disabled={variant !== 'active'}
      onKeyUp={(event) => handleKeyUp(event)}
      onKeyDown={(event) => handleKeyDown(event)}
      {...register(inputName)}
    />
  );
};

export default InputBox;
