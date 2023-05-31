'use client';

import { useInputStore } from '@/modules/game/stores/InputStore';
import { useKeysStore } from '@/modules/game/stores/KeysStore';
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
    currentInputElement?.focus();

    const keyToPress = value === '<' ? 'Backspace' : value;

    currentInputElement?.dispatchEvent(new KeyboardEvent('keyup', { key: keyToPress, bubbles: true }));
    // return false;
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
