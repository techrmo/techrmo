'use client';

import { useInputStore } from '@/modules/game/stores/InputStore';
import styles from './styles.module.scss';

interface KeyProps {
  value: string;
}

const Key = ({ value }: KeyProps) => {
  const { currentInput, currentForm } = useInputStore((state) => state);
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
    >
      {value}
    </button>
  );
};

export default Key;
