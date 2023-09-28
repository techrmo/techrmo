'use client';

import { useRef } from 'react';

import {
  type InitialStoreForm,
  useFormStore,
} from '@/app/(modules)/(game)/stores/Form';

interface StoreInitializerProps {
  initialStore?: InitialStoreForm;
}

const StoreInitializer = ({ initialStore }: StoreInitializerProps) => {
  const initialized = useRef(false);

  if (!initialized.current && initialStore) {
    useFormStore.getState().setInitialState(initialStore);
    initialized.current = true;
  }

  return null;
};

export default StoreInitializer;
