import { KeyboardEvent } from 'react';

import { useFormContext } from 'react-hook-form';
import { getAllowedElement } from '@/shared/helpers/hasElement';
import { FormFields } from '../validators/input';

type AllowedInputNames = 'value.0' | 'value.1' | 'value.2' | 'value.3' | 'value.4';

type HandleKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => void;

interface UseKeyEventsReturn {
  handleKeyUp: HandleKeyEvent;
  handleKeyDown: HandleKeyEvent;
}

const useKeyEvents = (
  inputName: AllowedInputNames,
): UseKeyEventsReturn => {
  const {
    setValue,
  } = useFormContext<FormFields>();

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const { previousElementSibling, nextElementSibling } = event.currentTarget;

    const isLetterKey = /^[a-zA-Z]$/.test(key);
    const isArrowLeftKey = key === 'ArrowLeft';
    const isArrowRightKey = key === 'ArrowRight';
    const isBackSpaceKey = key === 'Backspace';
    const previousInput = getAllowedElement(previousElementSibling, 'INPUT');
    const nextInput = getAllowedElement(nextElementSibling, 'INPUT');

    if (isLetterKey) {
      setValue(inputName, key.toLocaleUpperCase());
    }

    if (isBackSpaceKey) {
      setValue(inputName, '');
    }

    if (isLetterKey || isArrowRightKey) {
      nextInput?.focus();
    }
    if (isArrowLeftKey || isBackSpaceKey) {
      previousInput?.focus();
    }
  };

  /**
   * @description Para evitar que teclas mortas, como ~`,
   * apareçam no campo de entrada, foi necessário executar
   * um processo de "blur" e "focus" rapidamente ao pressionar
   * essa tecla. Essa abordagem permite obter o efeito desejado,
   * removendo a tecla morta e garantindo que apenas o caractere
   * desejado seja exibido no campo de entrada.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      event.preventDefault();
    }

    if (event.key !== 'Dead') {
      return;
    }

    const input = getAllowedElement(event.currentTarget, 'INPUT');

    input?.blur();
    setTimeout(() => input?.focus());
  };

  return { handleKeyDown, handleKeyUp };
};

export default useKeyEvents;
