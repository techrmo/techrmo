import { getAllowedElement } from '@/shared/helpers/hasElement';
import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';

import { useFormStore } from '../../stores/Form';

export const useHandleInput = () => {
  const currentInputElement = useFormStore(
    (state) => state.currentInputElement
  );
  const updateCurrentInputAndValues = useFormStore(
    (state) => state.updateCurrentInputAndValues
  );

  return (key: string) => {
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
  };
};
