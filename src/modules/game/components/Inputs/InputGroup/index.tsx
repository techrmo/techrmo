'use client';

import { useState } from 'react';
import DialogUI from '@/shared/components/DialogUI';
import { useFormStore } from '@/modules/game/stores/Form';
import type { RowColumnIndex } from '@/modules/game/stores/Form/FormSlice';
import styles from './styles.module.scss';
import InputBox from '../InputBox';
import InputRow from '../InputRow';

const InputGroup = () => {
  const numberOfRows = 5;
  const numberOfInputs = 5;
  const isWinner = useFormStore((store) => store.isWinner);
  const isLost = useFormStore((store) => store.isLost);
  const [isOpen, setIsOpen] = useState(true);

  console.log('perdeu', isLost);
  console.log('ganhou', isWinner);

  const inputsBox = (rowIndex: RowColumnIndex) => Array
    .from({ length: numberOfInputs })
    .map((_, index) => (
      <InputBox
        key={index}
        columnIndex={index as RowColumnIndex}
        rowIndex={rowIndex}
      />
    ));

  const rowGroup = Array
    .from({ length: numberOfRows })
    .map((_, index) => (
      <InputRow
        key={index}
      >
        {inputsBox(index as RowColumnIndex)}
      </InputRow>
    ));

  return (
    <div className={styles.container}>
      <DialogUI
        isOpen={isWinner}
        close={() => setIsOpen(false)}
      />
      {rowGroup}
    </div>
  );
};

export default InputGroup;
