import Keyboard from '@/modules/game/components/Keyboard';
import InputGroup from '@/modules/game/components/Inputs/InputGroup';
import Logo from '@/shared/components/Logo';

import styles from './styles.module.scss';

const Home = () => (
  <main className={styles.container}>
    <Logo />
    <InputGroup />
    <Keyboard />
  </main>
);

export default Home;
