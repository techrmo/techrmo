import { FocusEvent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useInputStore } from '@/modules/game/stores/InputStore';
import { type InputBoxIndex } from '../components/InputRow/InputBox';
import { type FormFields } from '../validators/input';

type UseFocusReturn = (event: FocusEvent<HTMLInputElement, Element>) => void;

const useFocus = (
  index: InputBoxIndex,
): UseFocusReturn => {
  const {
    setFocus,
  } = useFormContext<FormFields>();
  const setCurrentInput = useInputStore((state) => state.setCurrentInput);

  useEffect(() => {
    if (index === 0) {
      setFocus(`value.${index}`);
    }
  }, [index, setFocus]);

  const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    setCurrentInput(event.target);
  };

  return handleFocus;
};

export default useFocus;
