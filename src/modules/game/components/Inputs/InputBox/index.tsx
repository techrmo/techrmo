import { useFormContext } from 'react-hook-form';

import { useEffect, useRef } from 'react';
import useFocus from '@/modules/game/hooks/useFocus';
import useKeyEvents from '@/modules/game/hooks/useKeyEvents';
import useInputVariant from '@/modules/game/hooks/useInputVariant';
import { useInputStore } from '@/modules/game/stores/InputStore';
import styles from './styles.module.scss';
import { type InputRowIndex } from '../InputGroup';
import type { FormFields } from '@/modules/game/validators/input';

export type InputBoxIndex = 0 | 1 | 2 | 3 | 4;

interface InputBoxProps {
  index: InputBoxIndex;
  indexRow: InputRowIndex;
  isActiveRow: boolean;
}

const InputBox = ({
  index, isActiveRow, indexRow,
}: InputBoxProps) => {
  const inputName = `value.${index}` as const;
  const ref = useRef();
  const setCurrentInputElement = useInputStore((state) => state.setCurrentInputElement);

  const { register } = useFormContext<FormFields>();
  useEffect(() => {
    if (index === 0) {
      console.log(ref.current, register(inputName));
      setCurrentInputElement(ref.current);
    }
  }, []);

  const { handleKeyDown, handleKeyUp } = useKeyEvents(inputName);
  const handleFocus = useFocus(index, isActiveRow);
  const variant = useInputVariant({ index, indexRow, isActiveRow });

  return (
    <div
      ref={ref}
      className={styles.container}
      type='text'
      inputMode='none'
      autoComplete='off'
      disabled={variant !== 'active'}
      data-variant={variant}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      // {...register(inputName)}
    />
  );
};

export default InputBox;
