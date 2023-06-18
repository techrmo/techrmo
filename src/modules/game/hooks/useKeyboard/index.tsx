import { useCallback, useEffect } from 'react';

import { getAllowedElement } from '@/shared/helpers/hasElement';

import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';
import { useFormStore } from '../../stores/Form';

const useKeyboard = () => {
  const currentInputElement = useFormStore((state) => state.currentInputElement);
  const updateCurrentInputAndValues = useFormStore((state) => state.updateCurrentInputAndValues);
  const handleSubmit = useFormStore((state) => state.handleSubmit);

  const handleInput = useCallback((key: string) => {
    if (!currentInputElement) {
      return;
    }

    const { previousElementSibling, nextElementSibling } = currentInputElement;

    currentInputElement.blur();

    const isBackSpaceKey = ['Backspace', '<'].includes(key);
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (verifyIsLetterKey(key)) {
      updateCurrentInputAndValues(nextInput, key, 'NEXT');
      return;
    }

    if (isBackSpaceKey) {
      updateCurrentInputAndValues(previousInput, '', 'PREVIOUS');
    }
  }, [currentInputElement, updateCurrentInputAndValues]);

  const navigateWithArrow = useCallback((key: string) => {
    if (!currentInputElement) {
      return;
    }

    const { previousElementSibling, nextElementSibling } = currentInputElement;

    const isArrowLeftKey = key === 'ArrowLeft';
    const isArrowRightKey = key === 'ArrowRight';

    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (!verifyIsLetterKey(currentInputElement.value)) {
      return;
    }

    if (isArrowRightKey) {
      updateCurrentInputAndValues(nextInput, currentInputElement.value, 'NEXT');

      return;
    }

    if (isArrowLeftKey) {
      updateCurrentInputAndValues(previousInput, currentInputElement.value, 'PREVIOUS');
    }
  }, [currentInputElement, updateCurrentInputAndValues]);

  const handleKeyUp = useCallback(async (event: globalThis.KeyboardEvent | { key: string }) => {
    const { key } = event;

    if (key.toUpperCase() === 'ENTER') {
      currentInputElement?.removeAttribute('data-focused');
      await handleSubmit();
      return;
    }

    navigateWithArrow(key);
    handleInput(key);
  }, [currentInputElement, handleInput, handleSubmit, navigateWithArrow]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return { handleKeyUp };
};

export default useKeyboard;
