'use client';

import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { useDialogStore } from '@/shared/stores/dialogStore';

import styles from './styles.module.scss';

interface DialogUIProps {
  children: ReactNode;
}

const DialogUI = ({ children }: DialogUIProps) => {
  const { isOpen, close } = useDialogStore((store) => ({
    isOpen: store.isOpen,
    close: store.close,
  }));

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          {children}
          <Dialog.Close
            aria-label="Close"
            className={styles.close}
            onClick={close}
          >
            Fechar
          </Dialog.Close>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogUI;
