import { getCurrentWord } from '@/app/api/(services)';

import {
  Keyboard,
  InputGroup,
  StoreInitializer,
  Header,
  Onboarding,
} from '../../components';
import { getCurrentAttemptPlayerService } from '../../services/getCurrentAttemptPlayerService';

import styles from './styles.module.scss';

export const dynamic = 'force-dynamic';

const Home = async () => {
  const secretWord = await getCurrentWord();
  const initialStore = await getCurrentAttemptPlayerService(secretWord);

  const secretWordSize = secretWord?.value.length || 5;

  return (
    <main className={styles.container}>
      <StoreInitializer
        initialUserStore={initialStore}
        secretWordSize={secretWordSize}
      />
      <Onboarding />
      <Header />
      <InputGroup inputSize={secretWordSize} />
      <Keyboard />
    </main>
  );
};

export default Home;
