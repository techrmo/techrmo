import { create } from 'zustand';

interface KeyResult {
  value: string;
  result: string;
}

interface KeysStore {
  usedKeys: { [key: string]: string };
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
