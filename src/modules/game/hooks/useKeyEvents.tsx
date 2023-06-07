import { useCallback, useEffect } from 'react';

import { getAllowedElement } from '@/shared/helpers/hasElement';

import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';
import { useFormStore } from '../stores/Form';

const useKeyEvents = () => {
  const {
    currentInputElement,
    setCurrentInputElement,
    setValues,
  } = useFormStore((state) => state);

  const handleInput = useCallback((
    key: string,
    previousElementSibling: Element | null,
    nextElementSibling: Element | null,
  ) => {
    if (!currentInputElement) {
      return;
    }

    const isBackSpaceKey = ['Backspace', '<'].includes(key);
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (verifyIsLetterKey(key)) {
      currentInputElement.value = key;
      setValues(key);
      setCurrentInputElement(nextInput);
      return;
    }

    if (isBackSpaceKey) {
      currentInputElement.value = '';
      setValues('');
      setCurrentInputElement(previousInput);
    }
  }, [currentInputElement, setCurrentInputElement, setValues]);

  useEffect(() => {
    const navigateWithArrow = (
      key: string,
      previousElementSibling: Element | null,
      nextElementSibling: Element | null,
    ) => {
      const isArrowLeftKey = key === 'ArrowLeft';
      const isArrowRightKey = key === 'ArrowRight';

      const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
      const nextInput = getAllowedElement(nextElementSibling, 'INPUT');
      console.log(isArrowLeftKey, previousInput, isArrowRightKey);
      if (isArrowRightKey) {
        nextInput?.focus();

        return;
      }

      if (isArrowLeftKey) {
        previousInput?.focus();
      }
    };

    const handleKeyUp = (event: globalThis.KeyboardEvent) => {
      if (!currentInputElement) {
        return;
      }

      const { key } = event;
      const { previousElementSibling, nextElementSibling } = currentInputElement;

      currentInputElement.blur();

      navigateWithArrow(key, previousElementSibling, nextElementSibling);
      handleInput(key, previousElementSibling, nextElementSibling);
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [currentInputElement, setCurrentInputElement, handleInput]);

  return { handleInput };
};

export default useKeyEvents;
