'use client';

import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { useFormStore } from '@/modules/game/stores/Form';
import useKeyEvents from '@/modules/game/hooks/useKeyEvents';

import type { Keys } from '..';

import styles from './styles.module.scss';

interface KeyProps {
  value: Keys;
}

const Key = ({ value }: KeyProps) => {
  const {
    currentInputElement,
    currentFormIndex,
  } = useFormStore((state) => state);
  const usedKey = useKeysStore((state) => state.usedKeys[value]);
  const { handleInput } = useKeyEvents();

  const formReference = value === 'ENTER' ? `form-${currentFormIndex}` : undefined;
  const buttonType = value === 'ENTER' ? 'submit' : 'button';

  const handleClick = () => {
    if (!currentInputElement) {
      return;
    }

    const { previousElementSibling, nextElementSibling } = currentInputElement;

    handleInput(value, previousElementSibling, nextElementSibling);
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
