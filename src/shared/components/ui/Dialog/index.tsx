'use client';

import { ReactNode, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './styles.module.scss';

import { CloseIcon } from '@/shared/assets/icons/CloseIcon';

export interface DialogUIProps {
  contentClassName: string;
  titleClassName: string;
  title: string;
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

const DialogUI = forwardRef<HTMLDivElement, DialogUIProps>(
  (
    { contentClassName, titleClassName, title, isOpen, close, children },
    ref
  ) => (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content ref={ref} className={contentClassName}>
            <Dialog.Title className={titleClassName}>{title}</Dialog.Title>

            {children}

            <Dialog.Close
              aria-label="Close"
              className={styles.close}
              onClick={close}
            >
              <CloseIcon />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
);

export default DialogUI;
