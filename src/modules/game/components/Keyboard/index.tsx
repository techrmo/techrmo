'use client';

import Key from './Key';

import styles from './styles.module.scss';
import useKeyBoard from '../../hooks/useKeyboard';

export const firstLineKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] as const;
export const secondLineKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '<'] as const;
export const thirdLineKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'] as const;

export type Keys =
  typeof firstLineKeys[number] | typeof secondLineKeys[number] | typeof thirdLineKeys[number]

const Keyboard = () => {
  const { handleInput } = useKeyBoard();

  return (
    <div className={styles.container}>
      {[firstLineKeys, secondLineKeys, thirdLineKeys].map((keys, index) => (
        <div key={index}>
          {keys.map((value) => (
            <Key
              key={value}
              value={value}
              handleInput={handleInput}
            />
          ))}
        </div>
      ))}
    </div>

  );
};

export default Keyboard;
