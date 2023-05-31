'use client';

import { useInputStore } from '@/modules/game/stores/InputStore';
import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { getAllowedElement } from '@/shared/helpers/hasElement';
import styles from './styles.module.scss';

interface KeyProps {
  value: string;
}

const Key = ({ value }: KeyProps) => {
  const { currentInputElement, currentFormIndex } = useInputStore((state) => state);
  const usedKey = useKeysStore((state) => state.usedKeys[value]);
  const formReference = value === 'ENTER' ? `form-${currentFormIndex}` : undefined;
  const buttonType = value === 'ENTER' ? 'submit' : 'button';

  const handleClick = () => {
    if (!currentInputElement) {
      return;
    }

    currentInputElement.focus();
    const { previousElementSibling, nextElementSibling } = currentInputElement;

    const keyToPress = value === '<' ? 'Backspace' : value;

    const isLetterKey = /^[a-zA-Z]$/.test(keyToPress);
    const isArrowLeftKey = keyToPress === 'ArrowLeft';
    const isArrowRightKey = keyToPress === 'ArrowRight';
    const isBackSpaceKey = keyToPress === 'Backspace';
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (isLetterKey || isArrowRightKey) {
      nextInput?.focus();
    }
    if (isArrowLeftKey || isBackSpaceKey) {
      previousInput?.focus();
    }
    if (isLetterKey) {
      currentInputElement.value = keyToPress;
    }

    if (isBackSpaceKey) {
      currentInputElement.value = '';
    }
  };

  return (
    <button
      className={styles.container}
      form={formReference}
      type={buttonType}
      onClick={handleClick}
      data-variant={usedKey}
    >
      {value}
    </button>
  );
};

export default Key;
