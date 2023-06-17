import Loading from '@/shared/components/Loading';
import Logo from '@/shared/components/Logo';
import styles from './styles.module.scss';

const Teste = () => (
  <main className={styles.container}>
    <Logo />
    <Loading />
  </main>
);

export default Teste;
