import Image from 'next/image';

import AuthContainer from '../AuthContainer';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.container}>
      <Image src="./logo.svg" alt="Logo techrmo" width={150} height={100} />
      <AuthContainer />
    </header>
  );
};

export default Header;
