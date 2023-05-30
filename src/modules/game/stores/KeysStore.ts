import { create } from 'zustand';

interface KeyResult {
  value: string;
  result: string;
}

interface KeysStore {
  usedKeys: KeyResult[];
  setUsedKeys: (values: KeyResult[]) => void;
}

export const useKeysStore = create<KeysStore>((set, get) => ({
  usedKeys: [],
  setUsedKeys: (values: KeyResult[]) => {
    const { usedKeys } = get();

    const usedKeysParsed = values.reduce((previous, current) => {
      const keyFoundIndex = usedKeys.findIndex((key) => key.value === current.value);

      if (keyFoundIndex > -1) {
        const newValue = previous;
        newValue[keyFoundIndex] = current;
        return previous;
      }

      return [...previous, current];
    }, usedKeys);

    set(() => ({ usedKeys: usedKeysParsed }));
  },
}));
