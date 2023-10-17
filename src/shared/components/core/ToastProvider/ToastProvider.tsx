'use client';

import type { ReactNode } from 'react';
import * as ToastRadix from '@radix-ui/react-toast';
import { useShallow } from 'zustand/react/shallow';

import { useToastStore } from '@/shared/stores/toastStore';

import { ToastUI } from '../../ui/Toast';

import styles from './styles.module.scss';

interface ToastProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProps) => {
  const { toasts, removeToast } = useToastStore(
    useShallow((store) => ({
      toasts: store.toasts,
      removeToast: store.removeToast,
    }))
  );

  return (
    <ToastRadix.Provider swipeDirection="up">
      {children}
      {toasts.map((toast) => (
        <ToastUI key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
      <ToastRadix.Viewport className={styles.viewport} />
    </ToastRadix.Provider>
  );
};
