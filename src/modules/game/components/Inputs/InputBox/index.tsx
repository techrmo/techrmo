import { useEffect, useRef } from 'react';

import useInputVariant from '@/modules/game/hooks/useInputVariant';
import { useFormStore } from '@/modules/game/stores/Form';

import type { RowColumnIndex } from '@/modules/game/stores/Form/FormStore';

import styles from './styles.module.scss';

interface InputBoxProps {
  columnIndex: RowColumnIndex;
  rowIndex: RowColumnIndex;
}

const InputBox = ({
  columnIndex, rowIndex,
}: InputBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    setCurrentInputElement,
    setCurrentColumnIndex,
    currentRowIndex,
    currentColumnIndex,
  } = useFormStore((state) => state);

  const isActiveRow = currentRowIndex === rowIndex;
  const isActiveColumn = currentColumnIndex === columnIndex;
  const isFocusedInput = isActiveRow && isActiveColumn;

  const variant = useInputVariant({
    columnIndex,
    rowIndex,
    isActiveRow,
  });

  useEffect(() => {
    const isFirstInput = columnIndex === 0;
    if (isFirstInput && isActiveRow) {
      inputRef.current?.focus();
    }
  }, [isActiveRow, columnIndex]);

  const handleFocus = () => {
    setCurrentColumnIndex(columnIndex);
    setCurrentInputElement(inputRef.current);
  };

  return (
    <input
      ref={inputRef}
      className={styles.container}
      type='text'
      inputMode='none'
      autoComplete='off'
      disabled={variant !== 'active'}
      data-variant={variant}
      data-focused={isFocusedInput}
      onFocus={handleFocus}
      maxLength={1}
    />
  );
};

export default InputBox;
