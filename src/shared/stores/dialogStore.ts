import { create } from 'zustand';

interface State {
  isOpen: boolean;
}

interface Actions {
  close: () => void;
  open: () => void;
}

export interface DialogStore extends State, Actions {}

const initialState: State = {
  isOpen: false,
};

export const createDialogStore = () =>
  create<DialogStore>((set) => ({
    ...initialState,
    close: () => set({ isOpen: false }),
    open: () => set({ isOpen: true }),
  }));
