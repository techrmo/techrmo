'use client';

import { useRef } from 'react';

import {
  type InitialStoreForm,
  useFormStore,
} from '@/app/(modules)/(game)/stores/Form';

interface StoreInitializerProps {
  initialUserStore?: InitialStoreForm;
  secretWordSize: number;
}

const StoreInitializer = ({
  initialUserStore,
  secretWordSize,
}: StoreInitializerProps) => {
  const initialized = useRef(false);

  if (initialized.current) {
    return null;
  }

  if (secretWordSize) {
    useFormStore.setState({ wordSize: secretWordSize });
  }

  if (initialUserStore) {
    useFormStore.getState().setInitialState(initialUserStore);
    initialized.current = true;
  }

  return null;
};

export default StoreInitializer;
