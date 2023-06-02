import { create } from 'zustand';

import { firstLineKeys, secondLineKeys, thirdLineKeys } from '../components/Keyboard';

import type { LetterResult } from '../validators/responseWords';

export type Keys = typeof firstLineKeys[number] | typeof secondLineKeys[number] | typeof thirdLineKeys[number]
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
