'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import InputBox, { type InputBoxIndex } from '../InputBox';
import InputRow from '../InputRow';

export type InputRowIndex = 0 | 1 | 2 | 3 | 4;

const InputGroup = () => {
  const numberOfRows = 5;
  const numberOfInputs = 5;

  const [attemptNumber, setAttemptNumber] = useState(0);

  const inputsBox = (isActiveRow: boolean, indexRow: InputRowIndex) => Array
    .from({ length: numberOfInputs })
    .map((_, index) => (
      <InputBox
        isActiveRow={isActiveRow}
        key={index}
        index={index as InputBoxIndex}
        indexRow={indexRow}
      />
    ));

  const rowGroup = Array
    .from({ length: numberOfRows })
    .map((_, index) => (
      <InputRow
        key={index}
        index={index as InputBoxIndex}
        setAttemptNumber={setAttemptNumber}
      >
        {inputsBox(attemptNumber === index, index as InputRowIndex)}
      </InputRow>
    ));

  return (
    <div className={styles.container}>
      {rowGroup}
    </div>
  );
};

export default InputGroup;
