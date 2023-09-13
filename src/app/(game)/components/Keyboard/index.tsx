'use client';

import useKeyBoard from '../../hooks/useKeyboard';
import {
  firstLineKeys,
  secondLineKeys,
  thirdLineKeys,
} from '../../constants/Keys';

import Key from './Key';
import styles from './styles.module.scss';

const Keyboard = () => {
  const { handleKeyUp } = useKeyBoard();

  return (
    <div className={styles.container}>
      {[firstLineKeys, secondLineKeys, thirdLineKeys].map((keys, index) => (
        <div key={index}>
          {keys.map((value) => (
            <Key key={value} value={value} handleKeyUp={handleKeyUp} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
