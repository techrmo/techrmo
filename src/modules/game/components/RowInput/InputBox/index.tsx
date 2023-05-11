import { useRef, KeyboardEvent } from 'react';

import { getAllowedElement } from '@/shared/helpers/hasElement';

import styles from './styles.module.scss';

export const InputBox = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!ref.current) {
      return;
    }

    const { key } = event;
    const { previousElementSibling, nextElementSibling } = event.currentTarget;

    const isLetterKey = /^[a-zA-Z]$/.test(key);
    const isArrowLeftKey = key === 'ArrowLeft';
    const isArrowRightKey = key === 'ArrowRight';
    const isBackSpaceKey = key === 'Backspace';
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (isLetterKey) {
      ref.current.value = key.toLocaleUpperCase();
    }

    if (isBackSpaceKey) {
      ref.current.value = '';
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
      ref={ref}
      onKeyDown={(event) => handleKeyUp(event)}
    />
  );
};
