import Keyboard from '@/modules/game/components/Keyboard';
import InputGroup from '@/modules/game/views/InputGroup';

import styles from './styles.module.scss';

const Home = () => (
  <main className={styles.container}>
    <InputGroup />
    <Keyboard />
  </main>
);

export default Home;
