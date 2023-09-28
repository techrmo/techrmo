import {
  Keyboard,
  InputGroup,
  StoreInitializer,
  Header,
  Onboarding,
} from '../../components';
import { getCurrentAttemptPlayerService } from '../../services/getCurrentAttemptPlayerService';

import styles from './styles.module.scss';

const Home = async () => {
  const initialStore = await getCurrentAttemptPlayerService();

  return (
    <main className={styles.container}>
      <StoreInitializer initialStore={initialStore} />

      <Onboarding />
      <Header />
      <InputGroup />
      <Keyboard />
    </main>
  );
};

export default Home;
