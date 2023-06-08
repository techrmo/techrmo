'use client';

import type { RowColumnIndex } from '@/modules/game/stores/Form/FormSlice';
import styles from './styles.module.scss';
import InputBox from '../InputBox';
import InputRow from '../InputRow';

const InputGroup = () => {
  const numberOfRows = 5;
  const numberOfInputs = 5;

  console.log('Input Group');

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
        index={index as RowColumnIndex}
      >
        {inputsBox(index as RowColumnIndex)}
      </InputRow>
    ));

  return (
    <div className={styles.container}>
      {rowGroup}
    </div>
  );
};

export default InputGroup;
