import Logo from '@/shared/components/Logo';

import StoreInitializer from '../components/StoreInitializer';
import Keyboard from '../components/Keyboard';
import InputGroup from '../components/Inputs/InputGroup';
import LoginButtons from '../components/LoginButtons';
import { getCurrentAttemptPlayerService } from '../services/getCurrentAttemptPlayerService';

import styles from './styles.module.scss';

const Home = async () => {
  const initialStore = await getCurrentAttemptPlayerService();

  return (
    <main className={styles.container}>
      <StoreInitializer initialStore={initialStore} />
      <Logo />
      <LoginButtons />
      <InputGroup />
      <Keyboard />
    </main>
  );
};

export default Home;
