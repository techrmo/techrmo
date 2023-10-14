import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  variant: ToastVariant;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
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
