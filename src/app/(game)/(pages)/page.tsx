import { currentUser } from '@clerk/nextjs';

import Logo from '@/shared/components/Logo';
import { getCurrentAttemptPlayer } from '@/app/api/(services)/attempts';
import StoreInitializer from '@/shared/components/StoreInitializer';

import Keyboard from '../components/Keyboard';
import InputGroup from '../components/Inputs/InputGroup';
import LoginButtons from '../components/LoginButtons';
import { useFormStore } from '../stores/Form';

import styles from './styles.module.scss';

const getCurrentAttempt = async () => {
  const user = await currentUser();

  if (!user) {
    useFormStore.setState({
      resultsOfAttempts: [],
      values: [[]],
    });
    return;
  }

  const [firstEmail] = user.emailAddresses;

  if (!firstEmail) {
    return;
  }

  const attempt = await getCurrentAttemptPlayer(firstEmail.emailAddress);

  if (!attempt) {
    return;
  }

  const { values: currentAttempt } = attempt;

  const resultsOfAttempts = currentAttempt.map((current) =>
    current.map((item) => item.result)
  );
  const values = currentAttempt.map((current) =>
    current.map((item) => item.value)
  );

  console.log(values);

  useFormStore.setState({
    resultsOfAttempts,
    values: [...values, []],
    currentRowIndex: resultsOfAttempts.length,
  });
};

const Home = async () => {
  await getCurrentAttempt();

  const { resultsOfAttempts, values, currentRowIndex } =
    useFormStore.getState();

  return (
    <main className={styles.container}>
      <StoreInitializer
        resultsOfAttempts={resultsOfAttempts}
        values={values}
        currentRowIndex={currentRowIndex}
      />
      <Logo />
      <LoginButtons />
      <InputGroup />
      <Keyboard />
    </main>
  );
};

export default Home;
