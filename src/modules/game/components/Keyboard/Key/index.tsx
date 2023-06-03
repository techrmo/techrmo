'use client';

import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { getAllowedElement } from '@/shared/helpers/hasElement';
import { useForm } from '@/modules/game/stores/Form';

import styles from './styles.module.scss';
import { type Keys } from '..';

interface KeyProps {
  value: Keys;
}

const Key = ({ value }: KeyProps) => {
  const {
    currentInputElement,
    currentFormIndex,
    setCurrentInputElement,
  } = useForm((state) => state);
  const usedKey = useKeysStore((state) => state.usedKeys[value]);
  const formReference = value === 'ENTER' ? `form-${currentFormIndex}` : undefined;
  const buttonType = value === 'ENTER' ? 'submit' : 'button';

  const handleClick = () => {
    if (!currentInputElement) {
      return;
    }
    const { previousElementSibling, nextElementSibling } = currentInputElement;

    console.log(value);
    if (value === 'ENTER') {
      return;
    }
    console.log('value');

    const isLetterKey = /^[a-zA-Z]$/.test(value);
    const isBackSpaceKey = value === '<';
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (isLetterKey) {
      currentInputElement.value = value;
    }

    if (isBackSpaceKey) {
      currentInputElement.value = '';
    }

    if (isLetterKey) {
      setCurrentInputElement(nextInput);
    }
    if (isBackSpaceKey) {
      setCurrentInputElement(previousInput);
    }
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
