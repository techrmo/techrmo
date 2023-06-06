import { useCallback, useEffect } from 'react';

import { getAllowedElement } from '@/shared/helpers/hasElement';
import { useFormStore } from '../stores/Form';

const useKeyEvents = () => {
  const {
    currentInputElement,
    setCurrentInputElement,
  } = useFormStore((state) => state);

  const handleInput = useCallback((
    key: string,
    previousElementSibling: Element | null,
    nextElementSibling: Element | null,
  ) => {
    if (!currentInputElement) {
      return;
    }

    const isLetterKey = /^[a-zA-Z]$/.test(key);
    const isBackSpaceKey = ['Backspace', '<'].includes(key);
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (isLetterKey) {
      currentInputElement.value = key;
      setCurrentInputElement(nextInput);
      return;
    }

    if (isBackSpaceKey) {
      currentInputElement.value = '';
      setCurrentInputElement(previousInput);
    }
  }, [currentInputElement, setCurrentInputElement]);

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
