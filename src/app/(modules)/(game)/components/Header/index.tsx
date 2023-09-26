'use client';

import Image from 'next/image';

import { useOnboardingStore } from '@/shared/stores/onboardingStore';

import AuthContainer from '../AuthContainer';

import styles from './styles.module.scss';

const Header = () => {
  const openOnboarding = useOnboardingStore((store) => store.openOnboarding);

  return (
    <header className={styles.container}>
      <div>
        <Image src="/logo.svg" alt="Logo techrmo" width={150} height={50} />
        <button type="button" onClick={openOnboarding}>
          Como Jogar
        </button>
      </div>
      <AuthContainer />
    </header>
  );
};

export default Header;
