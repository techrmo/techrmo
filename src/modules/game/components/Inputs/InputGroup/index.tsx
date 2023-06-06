'use client';

import { useState } from 'react';
import type { RowColumnIndex } from '@/modules/game/stores/Form/FormStore';
import styles from './styles.module.scss';
import InputBox from '../InputBox';
import InputRow from '../InputRow';

const InputGroup = () => {
  const numberOfRows = 5;
  const numberOfInputs = 5;

  const [attemptNumber, setAttemptNumber] = useState(0);

  const inputsBox = (isActiveRow: boolean, rowIndex: RowColumnIndex) => Array
    .from({ length: numberOfInputs })
    .map((_, index) => (
      <InputBox
        isActiveRow={isActiveRow}
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
        index={index as RowColumnIndex}
        setAttemptNumber={setAttemptNumber}
      >
        {inputsBox(attemptNumber === index, index as RowColumnIndex)}
      </InputRow>
    ));

  return (
    <div className={styles.container}>
      {rowGroup}
    </div>
  );
};

export default InputGroup;
