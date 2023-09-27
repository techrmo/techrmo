import { createWithEqualityFn } from 'zustand/traditional';

import type { LetterResult } from '../validators/responseWords';
import type { Keys } from '../../../../shared/constants/Keys';

export interface KeyResult {
  value: Keys;
  result: LetterResult;
}
interface KeysStore {
  usedKeys: Partial<Record<Keys, LetterResult>>;
  usedKeysBackupOnboarding: Partial<Record<Keys, LetterResult>>;
  setUsedKeys: (values: KeyResult[]) => void;
  setKeyboardOnboarding: (
    usedKeys: Partial<Record<Keys, LetterResult>>
  ) => void;
  setUsedKeysBackupOnboarding: () => void;
  resetKeyboardOnboarding: () => void;
}

export const useKeysStore = createWithEqualityFn<KeysStore>(
  (set, get) => ({
    usedKeys: {},
    usedKeysBackupOnboarding: {},
    resetKeyboardOnboarding: () =>
      set({
        usedKeys: get().usedKeysBackupOnboarding,
        usedKeysBackupOnboarding: {},
      }),
    setUsedKeysBackupOnboarding: () =>
      set({
        usedKeysBackupOnboarding: get().usedKeys,
        usedKeys: {},
      }),
    setKeyboardOnboarding: (
      usedKeys: Partial<Record<Keys, LetterResult>> = {}
    ) => set({ usedKeys }),
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
