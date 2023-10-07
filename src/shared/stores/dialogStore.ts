import { createWithEqualityFn } from 'zustand/traditional';

export interface DialogStore {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

export const createDialogStore = () =>
  createWithEqualityFn<DialogStore>(
    (set) => ({
      isOpen: false,
      close: () => set({ isOpen: false }),
      open: () => set({ isOpen: true }),
    }),
    Object.is
  );
