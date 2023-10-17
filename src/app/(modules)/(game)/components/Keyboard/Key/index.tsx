import type { Keys } from '@/shared/constants/Keys';
import useStore from '@/shared/hooks/useStore';
import KeyUI from '@/app/(modules)/(game)/components/Keyboard/KeyUI/KeyUI';

import { useKeysStore } from '../../../stores/KeysStore';

interface KeyProps {
  value: Keys;
  handleKeyUp: ({ key }: { key: string }) => void;
}

const Key = ({ value, handleKeyUp }: KeyProps) => {
  const usedKey = useStore(useKeysStore, (state) => state.usedKeys[value]);
  const disableAllKeys = useStore(
    useKeysStore,
    (state) => state.disableAllKeys
  );

  return (
    <KeyUI
      disabled={!!disableAllKeys}
      value={value}
      variant={usedKey}
      handleKeyUp={() => handleKeyUp({ key: value })}
    />
  );
};

export default Key;
