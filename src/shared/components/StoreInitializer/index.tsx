'use client';

import { useRef } from 'react';

import { useFormStore } from '@/app/(game)/stores/Form';
import { FormSlice } from '@/app/(game)/stores/Form/FormSlice';
import { AttemptSlice } from '@/app/(game)/stores/Form/AttemptSlice';

interface StoreInitializerProps {
  values: FormSlice['values'];
  currentRowIndex: FormSlice['currentRowIndex'];
  resultsOfAttempts: AttemptSlice['resultsOfAttempts'];
}

const StoreInitializer = (props: StoreInitializerProps) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    useFormStore.setState(props);
    initialized.current = true;
  }

  return null;
};

export default StoreInitializer;
