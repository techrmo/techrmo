import type { Keys } from '@/shared/constants/Keys';
import useStore from '@/shared/hooks/useStore';

import { useKeysStore } from '../../../stores/KeysStore';

import styles from './styles.module.scss';

interface KeyProps {
  value: Keys;
  handleKeyUp: ({ key }: { key: string }) => void;
}

const Key = ({ value, handleKeyUp }: KeyProps) => {
  const usedKey = useStore(useKeysStore, (state) => state.usedKeys[value]);

  return (
    <button
      className={styles.container}
      type="button"
      data-variant={usedKey ?? null}
      onClick={() => handleKeyUp({ key: value })}
    >
      {value}
    </button>
  );
};

export default Key;
