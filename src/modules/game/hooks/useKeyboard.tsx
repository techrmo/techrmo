import { useCallback, useEffect } from 'react';

import { getAllowedElement } from '@/shared/helpers/hasElement';

import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';
import { useFormStore } from '../stores/Form';

const useKeyboard = () => {
  const {
    currentInputElement,
    setCurrentInputElement,
    updateCurrentInputAndValues,
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
      if (nextInput) {
        currentInputElement?.removeAttribute('data-focused');
        nextInput.setAttribute('data-focused', 'true');
      }
      updateCurrentInputAndValues(nextInput, key, 'NEXT');
      return;
    }

    if (isBackSpaceKey) {
      currentInputElement.value = '';
      if (previousInput) {
        currentInputElement.removeAttribute('data-focused');
        previousInput.setAttribute('data-focused', 'true');
      }
      updateCurrentInputAndValues(previousInput, '', 'NEXT');
    }
  }, [currentInputElement, updateCurrentInputAndValues]);

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
        nextInput?.focus();

        if (nextInput) {
          currentInputElement?.removeAttribute('data-focused');
          nextInput.setAttribute('data-focused', 'true');
        }

        return;
      }

      if (isArrowLeftKey) {
        previousInput?.focus();

        if (previousInput) {
          currentInputElement?.removeAttribute('data-focused');
          previousInput.setAttribute('data-focused', 'true');
        }
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

export default useKeyboard;
