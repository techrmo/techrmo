import Key from './Key';

import styles from './styles.module.scss';

const Keyboard = () => {
  const firstLineKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const secondLineKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '<'];
  const thirdLineKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'];

  return (
    <div className={styles.container}>
      {[firstLineKeys, secondLineKeys, thirdLineKeys].map((keys, index) => (
        <div key={index}>
          {keys.map((value) => <Key key={value} value={value} />)}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
