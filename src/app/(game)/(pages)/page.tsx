import Logo from '@/shared/components/Logo';

import Keyboard from '../components/Keyboard';
import InputGroup from '../components/Inputs/InputGroup';
import LoginButtons from '../components/LoginButtons';

import styles from './styles.module.scss';

const Home = () => {
  return (
    <main className={styles.container}>
      <Logo />
      <LoginButtons />
      <InputGroup />
      <Keyboard />
    </main>
  );
};

export default Home;
