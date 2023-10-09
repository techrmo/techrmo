import { UseBoundStoreWithEqualityFn } from 'zustand/traditional';
import { StoreApi } from 'zustand';
import { shallow } from 'zustand/shallow';
import { forwardRef } from 'react';

import { DialogStore } from '@/shared/stores/dialogStore';

import DialogUI, { type DialogUIProps } from '../../ui/Dialog';

interface DialogProps extends Omit<DialogUIProps, 'isOpen' | 'close'> {
  useDialogStore: UseBoundStoreWithEqualityFn<StoreApi<DialogStore>>;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ useDialogStore, ...rest }, ref) => {
    const { isOpen, close } = useDialogStore(
      (store) => ({
        isOpen: store.isOpen,
        close: store.close,
      }),
      shallow
    );

    return <DialogUI ref={ref} isOpen={isOpen} close={close} {...rest} />;
  }
);
