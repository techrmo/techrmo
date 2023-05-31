import { FocusEvent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useInputStore } from '@/modules/game/stores/InputStore';
import { type InputBoxIndex } from '../components/Inputs/InputBox';
import { type FormFields } from '../validators/input';

type UseFocusReturn = (event: FocusEvent<HTMLInputElement, Element>) => void;

const useFocus = (
  index: InputBoxIndex,
  isActiveRow: boolean,
): UseFocusReturn => {
  const {
    setFocus,
  } = useFormContext<FormFields>();
  const setCurrentInputElement = useInputStore((state) => state.setCurrentInputElement);

  useEffect(() => {
    if (index === 0) {
      setFocus(`value.${index}`);
    }
  }, [index, setFocus, isActiveRow]);

  const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    setCurrentInputElement(event.target);
  };

  return handleFocus;
};

export default useFocus;
