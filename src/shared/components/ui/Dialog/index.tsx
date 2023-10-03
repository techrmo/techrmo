'use client';

import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import styles from './styles.module.scss';

import { IcTwotoneClose } from '@/shared/assets/icons/CloseIcon';

interface DialogUIProps {
  contentClassName: string;
  titleClassName: string;
  title: string;
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

const DialogUI = ({
  contentClassName,
  titleClassName,
  title,
  isOpen,
  close,
  children,
}: DialogUIProps) => (
  <Dialog.Root open={isOpen} onOpenChange={close}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay}>
        <Dialog.Content className={contentClassName}>
          <Dialog.Title className={titleClassName}>{title}</Dialog.Title>

          {children}

          <Dialog.Close
            aria-label="Close"
            className={styles.close}
            onClick={close}
          >
            <IcTwotoneClose />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogUI;
