import { create } from 'zustand';

import type { LetterResult } from '../validators/responseWords';
import type { Keys } from '../../../../shared/constants/Keys';

export interface KeyResult {
  value: Keys;
  result: LetterResult;
}

type UsedKeysType = Partial<Record<Keys, LetterResult>>;

interface KeysStoreStates {
  usedKeys: UsedKeysType;
  usedKeysBackupOnboarding: UsedKeysType;
  disableAllKeys: boolean;
}
interface KeysStoreActions {
  setUsedKeys: (values: KeyResult[]) => void;
  setKeyboardOnboarding: (usedKeys: UsedKeysType) => void;
  setUsedKeysBackupOnboarding: () => void;
  resetKeyboardOnboarding: () => void;
  setDisableAllKeys: (data: boolean) => void;
}

type KeysStore = KeysStoreStates & KeysStoreActions;

const initialState: KeysStoreStates = {
  usedKeys: {},
  usedKeysBackupOnboarding: {},
  disableAllKeys: false,
};

export const useKeysStore = create<KeysStore>((set, get) => ({
  ...initialState,
  setDisableAllKeys: (disableAllKeys: boolean) => set({ disableAllKeys }),
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
  setKeyboardOnboarding: (usedKeys: UsedKeysType = {}) => set({ usedKeys }),
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
}));
