import { useCallback, useEffect } from 'react';

import useStore from '@/shared/hooks/useStore';

import { useFormStore } from '../../stores/Form';
import { useResultStore } from '../../stores/ResultStore';

import { useHandleInput } from './handleInput';
import { useNavigateWithArrow } from './navigateWithArrow';

const useKeyboard = () => {
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const isBlockSend = useFormStore((state) => state.isBlockSend);
  const status = useStore(useResultStore, (store) => store.status);
  const handleInput = useHandleInput();
  const navigateWithArrow = useNavigateWithArrow();

  const handleKeyUp = useCallback(
    async (event: globalThis.KeyboardEvent | { key: string }) => {
      const { key } = event;

      if (status !== 'PLAYING' || isBlockSend) {
        return;
      }

      if (key.toUpperCase() === 'ENTER') {
        await handleSubmit();
        return;
      }

      navigateWithArrow(key);
      handleInput(key);
    },
    [handleInput, handleSubmit, navigateWithArrow]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return { handleKeyUp };
};

export default useKeyboard;
