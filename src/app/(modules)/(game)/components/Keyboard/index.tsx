'use client';

import {
  firstLineKeys,
  secondLineKeys,
  thirdLineKeys,
} from '@/shared/constants/Keys';

import useKeyBoard from '../../hooks/useKeyboard';

import Key from './Key';
import styles from './styles.module.scss';

const Keyboard = () => {
  const { handleKeyUp } = useKeyBoard();

  return (
    <div className={`${styles.container} keyboard`}>
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
