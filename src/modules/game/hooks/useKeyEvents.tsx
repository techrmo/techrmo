import { useCallback, useEffect } from 'react';

import { getAllowedElement } from '@/shared/helpers/hasElement';
import type { Keys } from '../components/Keyboard';
import { useFormStore } from '../stores/Form';

const isLetterKey = (key: string): key is Keys => /^[a-zA-Z]$/.test(key);

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

    if (isLetterKey(key)) {
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

      if (isArrowRightKey) {
        setCurrentInputElement(nextInput);
        return;
      }

      if (isArrowLeftKey) {
        setCurrentInputElement(previousInput);
      }
    };

    const handleKeyUp = (event: globalThis.KeyboardEvent) => {
      if (!currentInputElement) {
        return;
      }

      const { key } = event;
      const { previousElementSibling, nextElementSibling } = currentInputElement;

      navigateWithArrow(key, previousElementSibling, nextElementSibling);
      handleInput(key, previousElementSibling, nextElementSibling);
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [currentInputElement, setCurrentInputElement, handleInput]);

  return { handleInput };
};

export default useKeyEvents;
