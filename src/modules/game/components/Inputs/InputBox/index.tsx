import { useEffect, useRef } from 'react';
import { shallow } from 'zustand/shallow';

import useInputVariant from '@/modules/game/hooks/useInputVariant';
import { useFormStore } from '@/modules/game/stores/Form';

import type { RowColumnIndex } from '@/modules/game/stores/Form/FormStore';

import styles from './styles.module.scss';

interface InputBoxProps {
  columnIndex: RowColumnIndex;
  rowIndex: RowColumnIndex;
  isActiveRow: boolean;
}

const InputBox = ({
  columnIndex, rowIndex, isActiveRow,
}: InputBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setCurrentInputElement, currentRowIndex } = useFormStore((state) => state);
  const variant = useInputVariant({ columnIndex, rowIndex, isActiveRow });

  useEffect(() => {
    if (columnIndex === 0 && currentRowIndex === rowIndex) {
      setCurrentInputElement(inputRef.current);
    }
  }, [setCurrentInputElement, currentRowIndex, columnIndex, rowIndex]);

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
