'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import InputBox, { type InputBoxIndex } from '../../components/InputRow/InputBox';
import InputRow from '../../components/InputRow';

const InputGroup = () => {
  const numberOfRows = 5;
  const word = 'ALVES';

  const numberOfInputs = 5;
  const [attemptNumber, setAttemptNumber] = useState(0);

  const inputsBox = (isActiveRow: boolean) => Array
    .from({ length: numberOfInputs })
    .map((_, index) => (
      <InputBox
        isActiveRow={isActiveRow}
        key={index}
        index={index as InputBoxIndex}
        word={word}
      />
    ));

  const rowGroup = Array
    .from({ length: numberOfRows })
    .map((_, index) => (
      <InputRow
        key={index}
        setAttemptNumber={setAttemptNumber}
      >
        {inputsBox(attemptNumber === index)}
      </InputRow>
    ));

  return (
    <div className={styles.container}>
      {rowGroup}
    </div>
  );
};

export default InputGroup;
