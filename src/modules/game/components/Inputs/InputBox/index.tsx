import { useEffect, useRef } from 'react';
import { shallow } from 'zustand/shallow';

import useInputVariant from '@/modules/game/hooks/useInputVariant';
import { useFormStore } from '@/modules/game/stores/Form';
import styles from './styles.module.scss';
import { type InputRowIndex } from '../InputGroup';

export type InputBoxIndex = 0 | 1 | 2 | 3 | 4;

interface InputBoxProps {
  index: InputBoxIndex;
  indexRow: InputRowIndex;
  isActiveRow: boolean;
}

const InputBox = ({
  index, isActiveRow, indexRow,
}: InputBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [currentInputElement, setCurrentInputElement] = useFormStore(
    (state) => [state.currentInputElement, state.setCurrentInputElement],
    shallow,
  );
  const variant = useInputVariant({ index, indexRow, isActiveRow });

  useEffect(() => {
    if (index === 0 && indexRow === 0) {
      setCurrentInputElement(inputRef.current);
    }
  }, [setCurrentInputElement, index, indexRow]);

  return (
    <input
      ref={inputRef}
      className={styles.container}
      type='text'
      inputMode='none'
      autoComplete='off'
      disabled={variant !== 'active'}
      data-variant={variant}
      maxLength={1}
    />
  );
};

export default InputBox;
