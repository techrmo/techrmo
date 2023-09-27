'use client';

import type { RowColumnIndex } from '../../stores/Form/FormSlice';
import DialogGameFinished from '../DialogGameFinished';

import InputRow from './InputRow';
import InputBox from './InputRow/InputBox';

import styles from './styles.module.scss';

const InputGroup = () => {
  const numberOfAttempts = [0, 1, 2, 3, 4] as const
  const numberOfInputs = [0, 1, 2, 3, 4] as const

  const inputsBox = (rowIndex: RowColumnIndex) =>
    (numberOfInputs).map((value) => (
      <InputBox
        key={value}
        columnIndex={value}
        rowIndex={rowIndex}
        isOnboarding={rowIndex === 0}
      />
    ));

  
  const rowGroup = numberOfAttempts.map((value) => (
    <InputRow key={value} isOnboarding={value === 0}>
      {inputsBox(value)}
    </InputRow>
  ));

  return (
    <div className={styles.container}>
      <DialogGameFinished />
      {rowGroup}
    </div>
  );
};

export default InputGroup;
