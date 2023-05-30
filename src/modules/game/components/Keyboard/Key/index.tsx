'use client';

import { useInputStore } from '@/modules/game/stores/InputStore';
import { useKeysStore } from '@/modules/game/stores/KeysStore';
import styles from './styles.module.scss';

interface KeyProps {
  value: string;
}

const Key = ({ value }: KeyProps) => {
  const { currentInput, currentForm } = useInputStore((state) => state);
  const usedKeys = useKeysStore((state) => state.usedKeys);
  const formReference = value === 'ENTER' ? currentForm : undefined;
  const buttonType = value === 'ENTER' ? 'submit' : 'button';

  const handleClick = () => {
    currentInput?.focus();

    const keyToPress = value === '<' ? 'Backspace' : value;

    currentInput?.dispatchEvent(new KeyboardEvent('keyup', { key: keyToPress, bubbles: true }));
  };

  return (
    <button
      className={styles.container}
      form={formReference}
      type={buttonType}
      onClick={handleClick}
      data-variant={usedKeys[value]}
    >
      {value}
    </button>
  );
};

export default Key;
