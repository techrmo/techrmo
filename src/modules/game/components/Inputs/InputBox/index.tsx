import { useEffect, useRef } from 'react';

import useInputVariant from '@/modules/game/hooks/useInputVariant';
import { useFormStore } from '@/modules/game/stores/Form';
import type { RowColumnIndex } from '@/modules/game/stores/Form/FormSlice';

import styles from './styles.module.scss';

interface InputBoxProps {
  columnIndex: RowColumnIndex;
  rowIndex: RowColumnIndex;
}

const InputBox = ({ columnIndex, rowIndex }: InputBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateCurrentInputAndPosition = useFormStore(
    (state) => state.updateCurrentInputAndPosition
  );
  const currentRowIndex = useFormStore((state) => state.currentRowIndex);
  const isActiveRow = currentRowIndex === rowIndex;

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
  }, [columnIndex, isActiveRow]);

  const handleFocus = () => {
    updateCurrentInputAndPosition(inputRef.current, columnIndex);
  };

  return (
    <input
      ref={inputRef}
      className={styles.container}
      type="text"
      inputMode="none"
      autoComplete="off"
      maxLength={1}
      disabled={!isActiveRow}
      data-variant={variant}
      pattern="[a-zA-Z]"
      onFocus={handleFocus}
    />
  );
};

export default InputBox;
