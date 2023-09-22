import { create } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';

import type { LetterResult } from '../validators/responseWords';
import type { Keys } from '../../../shared/constants/Keys';

export interface KeyResult {
  value: Keys;
  result: LetterResult;
}
interface KeysStore {
  usedKeys: Partial<Record<Keys, LetterResult>>;
  setUsedKeys: (values: KeyResult[]) => void;
}

export const useKeysStore = createWithEqualityFn<KeysStore>(
  (set, get) => ({
    usedKeys: {},
    setUsedKeys: (values: KeyResult[]) => {
      const { usedKeys } = get();

      const usedKeysParsed = values.reduce(
        (previous, current) => ({
          ...previous,
          [current.value]: current.result,
        }),
        usedKeys
      );

      set(() => ({ usedKeys: usedKeysParsed }));
    },
  }),
  Object.is
);
