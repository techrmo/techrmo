'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import InputBox, { type InputBoxIndex } from '../InputBox';
import InputRow from '../InputRow';

const InputGroup = () => {
  const numberOfRows = 5;
  const numberOfInputs = 5;

  const [attemptNumber, setAttemptNumber] = useState(0);

  const inputsBox = (isActiveRow: boolean, results) => Array
    .from({ length: numberOfInputs })
    .map((_, index) => (
      <InputBox
        isActiveRow={isActiveRow}
        key={index}
        index={index as InputBoxIndex}
        result={results[index]}
      />
    ));

  const rowGroup = Array
    .from({ length: numberOfRows })
    .map((_, index) => (
      <InputRow
        key={index}
        index={index as InputBoxIndex}
        attemptNumber={attemptNumber}
        setAttemptNumber={setAttemptNumber}
      >
        {(results) => inputsBox(attemptNumber === index, results)}
      </InputRow>
    ));

  return (
    <div className={styles.container}>
      {rowGroup}
    </div>
  );
};

export default InputGroup;
