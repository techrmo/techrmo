import { createWithEqualityFn } from 'zustand/traditional';

interface DialogStore {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

export const useDialogStore = createWithEqualityFn<DialogStore>(
  (set) => ({
    isOpen: false,
    close: () => set({ isOpen: false }),
    open: () => set({ isOpen: true }),
  }),
  Object.is
);
