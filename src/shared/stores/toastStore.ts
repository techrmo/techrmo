import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  variant: ToastVariant;
}

interface State {
  toasts: Toast[];
}

interface Actions {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

interface ToastStore extends State, Actions {}

const initialState: State = {
  toasts: [],
};

export const useToastStore = create<ToastStore>((set, get) => ({
  ...initialState,
  addToast: (toast: Omit<Toast, 'id'>) =>
    set({
      toasts: [
        { duration: 3000, ...toast, id: crypto.randomUUID() },
        ...get().toasts,
      ],
    }),
  removeToast: (id: string) =>
    set({ toasts: get().toasts.filter((toast) => toast.id !== id) }),
}));
