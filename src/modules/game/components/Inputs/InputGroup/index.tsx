'use client';

import { useState } from 'react';

import DialogUI from '@/shared/components/DialogUI';
import { useFormStore } from '@/modules/game/stores/Form';
import { numberOfAttempts } from '@/modules/game/stores/Form/AttemptSlice';
import type { RowColumnIndex } from '@/modules/game/stores/Form/FormSlice';

import InputBox from '../InputBox';
import InputRow from '../InputRow';

import styles from './styles.module.scss';

const InputGroup = () => {
  const numberOfInputs = 5;
  const { isWinner, isLost } = useFormStore((store) => ({
    isWinner: store.isWinner,
    isLost: store.isLost,
  }));

  const [isOpen, setIsOpen] = useState(true);

  const inputsBox = (rowIndex: RowColumnIndex) =>
    Array.from({ length: numberOfInputs }).map((_, index) => (
      <InputBox
        key={index}
        columnIndex={index as RowColumnIndex}
        rowIndex={rowIndex}
      />
    ));

  const rowGroup = Array.from({ length: numberOfAttempts }).map((_, index) => (
    <InputRow key={index}>{inputsBox(index as RowColumnIndex)}</InputRow>
  ));

  return (
    <div className={styles.container}>
      <DialogUI isOpen={isWinner} close={() => setIsOpen(false)} />
      {rowGroup}
    </div>
  );
};

export default InputGroup;
