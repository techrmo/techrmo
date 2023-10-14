import { useShallow } from 'zustand/react/shallow';
import type { StoreApi, UseBoundStore } from 'zustand';
import { forwardRef } from 'react';

import { DialogStore } from '@/shared/stores/dialogStore';

import DialogUI, { type DialogUIProps } from '../../ui/Dialog';

interface DialogProps extends Omit<DialogUIProps, 'isOpen' | 'close'> {
  useDialogStore: UseBoundStore<StoreApi<DialogStore>>;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ useDialogStore, ...rest }, ref) => {
    const { isOpen, close } = useDialogStore(
      useShallow((store) => ({
        isOpen: store.isOpen,
        close: store.close,
      }))
    );

    return <DialogUI ref={ref} isOpen={isOpen} close={close} {...rest} />;
  }
);
