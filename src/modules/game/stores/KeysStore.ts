import { create } from 'zustand';

import type { Keys } from '../components/Keyboard';
import type { LetterResult } from '../validators/responseWords';

interface KeyResult {
  value: Keys;
  result: LetterResult;
}
interface KeysStore {
  usedKeys: Partial<Record<Keys, LetterResult>>;
  setUsedKeys: (values: KeyResult[]) => void;
}

export const useKeysStore = create<KeysStore>((set, get) => ({
  usedKeys: {},
  setUsedKeys: (values: KeyResult[]) => {
    const { usedKeys } = get();

    const usedKeysParsed = values.reduce(
      (previous, current) => ({ ...previous, [current.value]: current.result }),
      usedKeys,
    );

    set(() => ({ usedKeys: usedKeysParsed }));
  },
}));
