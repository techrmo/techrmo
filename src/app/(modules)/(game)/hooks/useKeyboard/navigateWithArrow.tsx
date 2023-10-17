import { getAllowedElement } from '@/shared/helpers/hasElement';
import { verifyIsLetterKey } from '@/shared/helpers/verifyIsLetterKey';

import { useFormStore } from '../../stores/Form';

export const useNavigateWithArrow = () => {
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

    const isArrowLeftKey = key === 'ArrowLeft';
    const isArrowRightKey = key === 'ArrowRight';

    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (
      !verifyIsLetterKey(currentInputElement.value) &&
      currentInputElement.value !== ''
    ) {
      return;
    }

    if (isArrowRightKey) {
      updateCurrentInputAndValues(nextInput, currentInputElement.value, 'NEXT');

      return;
    }

    if (isArrowLeftKey) {
      updateCurrentInputAndValues(
        previousInput,
        currentInputElement.value,
        'PREVIOUS'
      );
    }
  };
};
