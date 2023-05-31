'use client';

import { useInputStore } from '@/modules/game/stores/InputStore';
import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { getAllowedElement } from '@/shared/helpers/hasElement';
import styles from './styles.module.scss';

interface KeyProps {
  value: string;
}

const Key = ({ value }: KeyProps) => {
  const { currentInputElement, currentFormIndex, setCurrentInputElement } = useInputStore((state) => state);
  const usedKey = useKeysStore((state) => state.usedKeys[value]);
  const formReference = value === 'ENTER' ? `form-${currentFormIndex}` : undefined;
  const buttonType = value === 'ENTER' ? 'submit' : 'button';

  const handleClick = (event) => {
    console.log(currentInputElement);
    if (!currentInputElement) {
      return;
    }
    // currentInputElement.focus();
    const { previousElementSibling, nextElementSibling } = currentInputElement;

    const isLetterKey = /^[a-zA-Z]$/.test(value);
    const isArrowLeftKey = value === 'ArrowLeft';
    const isArrowRightKey = value === 'ArrowRight';
    const isBackSpaceKey = value === '<';
    // const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    // const nextInput = getAllowedElement(nextElementSibling, 'DIV');

    if (isLetterKey) {
      currentInputElement.innerHTML = value;
    }

    if (isBackSpaceKey) {
      previousElementSibling.innerHTML = '';
    }
    // console.log(nextInput, previousInput);
    if (isLetterKey || isArrowRightKey) {
      setCurrentInputElement(nextElementSibling);
      // nextInput?.focus();
    }
    if (isArrowLeftKey || isBackSpaceKey) {
      setCurrentInputElement(previousElementSibling);
    }

    // const keyToPress = value === '<' ? 'Backspace' : value;

    // currentInputElement?.dispatchEvent(new KeyboardEvent('keyup', { key: keyToPress, bubbles: true }));
    // // return false;
  };

  return (
    <button
      className={styles.container}
      form={formReference}
      type={buttonType}
      data-variant={usedKey}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Key;
