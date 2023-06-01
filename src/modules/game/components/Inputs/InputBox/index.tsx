import { useEffect, useRef } from 'react';

import useInputVariant from '@/modules/game/hooks/useInputVariant';
import { useInputStore } from '@/modules/game/stores/InputStore';
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
  const { setCurrentInputElement } = useInputStore((state) => state);
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

    />
  );
};

export default InputBox;
