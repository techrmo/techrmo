import Image from 'next/image';

import AuthContainer from '../AuthContainer';

import styles from './styles.module.scss';

import Logo from '@/shared/assets/logo.svg';

const Header = () => {
  return (
    <header className={styles.container}>
      <Image src={Logo} alt="Logo techrmo" width={150} />
      <AuthContainer />
    </header>
  );
};

export default Header;
