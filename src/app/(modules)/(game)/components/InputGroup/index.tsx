'use client';

import { numberOfAttempts } from '../../stores/Form/AttemptSlice';
import type { RowColumnIndex } from '../../stores/Form/FormSlice';
import { DialogFinished } from '../';

import InputBox from './InputRow/InputBox';
import InputRow from './InputRow';
import styles from './styles.module.scss';

const InputGroup = () => {
  const numberOfInputs = 5;

  const inputsBox = (rowIndex: RowColumnIndex) =>
    Array.from({ length: numberOfInputs }).map((_, index) => (
      <InputBox
        key={index}
        columnIndex={index as RowColumnIndex}
        rowIndex={rowIndex}
        onboarding={rowIndex === 0}
      />
    ));

  const rowGroup = Array.from({ length: numberOfAttempts }).map((_, index) => (
    <InputRow key={index} onboarding={index === 0}>
      {inputsBox(index as RowColumnIndex)}
    </InputRow>
  ));

  return (
    <div className={styles.container}>
      <DialogFinished />
      {rowGroup}
    </div>
  );
};

export default InputGroup;
