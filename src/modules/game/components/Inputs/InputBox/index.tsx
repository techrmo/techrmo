import { useFormContext } from 'react-hook-form';

import { useEffect } from 'react';
import useFocus from '@/modules/game/hooks/useFocus';
import useInputVariant from '@/modules/game/hooks/useInputVariant';
import { getAllowedElement } from '@/shared/helpers/hasElement';
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
  const {
    setCurrentInputElement,
  } = useInputStore((state) => state);
  const { register } = useFormContext<FormFields>();

  const handleFocus = useFocus(index, isActiveRow);
  const variant = useInputVariant({ index, indexRow, isActiveRow });

  useEffect(() => {
    if (index === 0 && indexRow === 0) {
      console.log('oi');
      setCurrentInputElement(register(inputName).ref);
    }
  }, [setCurrentInputElement, index, indexRow, register, inputName]);

  return (
    <input
      className={styles.container}
      type='text'
      inputMode='none'
      autoComplete='off'
      disabled={variant !== 'active'}
      data-variant={variant}
      onFocus={handleFocus}
      {...register(inputName)}
    />
  );
};

export default InputBox;
