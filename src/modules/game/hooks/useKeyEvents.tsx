import { useCallback, useEffect } from 'react';

import { getAllowedElement } from '@/shared/helpers/hasElement';
import { useInputStore } from '../stores/InputStore';

const useKeyEvents = () => {
  const {
    currentInputElement,
    setCurrentInputElement,
  } = useInputStore((state) => state);

  const handleKeyUp = useCallback((event: globalThis.KeyboardEvent) => {
    if (!currentInputElement) {
      return;
    }

    const { key } = event;
    const { previousElementSibling, nextElementSibling } = currentInputElement;

    console.log(key);
    if (key === 'Enter') {
      event.preventDefault();
      return;
    }
    const isLetterKey = /^[a-zA-Z]$/.test(key);
    const isArrowLeftKey = key === 'ArrowLeft';
    const isArrowRightKey = key === 'ArrowRight';
    const isBackSpaceKey = key === 'Backspace';
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (isLetterKey) {
      currentInputElement.value = key;
    }

    if (isBackSpaceKey) {
      currentInputElement.value = '';
    }

    if (isLetterKey || isArrowRightKey) {
      setCurrentInputElement(nextInput);
    }
    if (isArrowLeftKey || isBackSpaceKey) {
      setCurrentInputElement(previousInput);
    }
  }, [currentInputElement, setCurrentInputElement]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);
};

export default useKeyEvents;
