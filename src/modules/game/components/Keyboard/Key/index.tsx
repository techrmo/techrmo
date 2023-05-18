'use client';

import { useInputStore } from '@/modules/stores/InputStore';
import styles from './styles.module.scss';

interface KeyProps {
  value: string;
}

const Key = ({ value }: KeyProps) => {
  const currentInput = useInputStore((state) => state.currentInput);

  const handleClick = () => {
    currentInput?.focus();

    currentInput?.dispatchEvent(new KeyboardEvent('keyup', { key: value, bubbles: true }));
  };

  return (
    <button
      className={styles.container}
      type='button'
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Key;
