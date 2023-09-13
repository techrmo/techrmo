import { create } from 'zustand';

interface DialogStore {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));
