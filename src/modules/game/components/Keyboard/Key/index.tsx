import { useKeysStore } from '@/modules/game/stores/KeysStore';
import { useFormStore } from '@/modules/game/stores/Form';

import type { Keys } from '..';

import styles from './styles.module.scss';

interface KeyProps {
  value: Keys;
  handleInput: (
    key: string,
    previousElementSibling: Element | null,
    nextElementSibling: Element | null
  ) => void;
}

const Key = ({ value, handleInput }: KeyProps) => {
  const currentInputElement = useFormStore((state) => state.currentInputElement);
  const currentRowIndex = useFormStore((state) => state.currentRowIndex);
  const usedKey = useKeysStore((state) => state.usedKeys[value]);

  const formReference = value === 'ENTER' ? `form-${currentRowIndex}` : undefined;
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
