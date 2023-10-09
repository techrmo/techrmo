import { useEffect, useRef } from 'react';

import { useResultStore } from '@/app/(modules)/(game)/stores/ResultStore';
import useInputVariant from '@/app/(modules)/(game)/hooks/useInputVariant';
import { useFormStore } from '@/app/(modules)/(game)/stores/Form';
import type { RowColumnIndex } from '@/app/(modules)/(game)/stores/Form/FormSlice';
import useStore from '@/shared/hooks/useStore';
import InputBoxUI from '@/shared/components/ui/InputBox';

interface InputBoxProps {
  columnIndex: RowColumnIndex;
  rowIndex: RowColumnIndex;
  onboarding: boolean;
}

const InputBox = ({ columnIndex, rowIndex, onboarding }: InputBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateCurrentInputAndPosition = useFormStore(
    (state) => state.updateCurrentInputAndPosition
  );
  const currentRowIndex = useFormStore((state) => state.currentRowIndex);
  const values = useFormStore((state) => state.values);
  const status = useStore(useResultStore, (store) => store.status);
  const isActiveRow = currentRowIndex === rowIndex && status === 'PLAYING';
  const classOnboarding = onboarding ? `input-box-${columnIndex}` : '';

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

  const getDefaultValue = () => {
    const currentRow = values[rowIndex];
    if (!currentRow?.length) {
      return;
    }

    return currentRow[columnIndex];
  };

  return (
    <InputBoxUI
      defaultValue={getDefaultValue()}
      handleFocus={handleFocus}
      isActiveRow={isActiveRow}
      variant={variant}
      ref={inputRef}
      className={classOnboarding}
    />
  );
};

export default InputBox;
