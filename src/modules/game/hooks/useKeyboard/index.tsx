import { useCallback, useEffect } from 'react';

import { useHandleInput } from './handleInput';
import { useNavigateWithArrow } from './navigateWithArrow';
import { useFormStore } from '../../stores/Form';

const useKeyboard = () => {
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const handleInput = useHandleInput();
  const navigateWithArrow = useNavigateWithArrow();

  const handleKeyUp = useCallback(async (event: globalThis.KeyboardEvent | { key: string }) => {
    const { key } = event;

    if (key.toUpperCase() === 'ENTER') {
      await handleSubmit();
      return;
    }

    navigateWithArrow(key);
    handleInput(key);
  }, [handleInput, handleSubmit, navigateWithArrow]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return { handleKeyUp };
};

export default useKeyboard;
