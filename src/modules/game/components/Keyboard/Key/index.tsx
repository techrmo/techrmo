import { useKeysStore } from '@/modules/game/stores/KeysStore';
import type { Keys } from '@/modules/game/constants/Keys';

import styles from './styles.module.scss';

interface KeyProps {
  value: Keys;
  handleKeyUp: ({ key }: { key: string }) => void;
}

const Key = ({ value, handleKeyUp }: KeyProps) => {
  const usedKey = useKeysStore((state) => state.usedKeys[value]);

  return (
    <button
      className={styles.container}
      type="button"
      data-variant={usedKey}
      onClick={() => handleKeyUp({ key: value })}
    >
      {value}
    </button>
  );
};

export default Key;
