'use client';

import Image from 'next/image';

import { useOnboardingStore } from '@/shared/stores/onboardingStore';
import TooltipUI from '@/shared/components/ui/Tooltip';

import Profile from '../Profile';

import styles from './styles.module.scss';

import HelpOutilineIcon from '@/shared/assets/icons/HelpOutilineIcon';

const Header = () => {
  const openOnboarding = useOnboardingStore((store) => store.openOnboarding);

  return (
    <header className={styles.container}>
      <div>
        <Image
          src="/logo-medium.svg"
          alt="Logo techrmo"
          width={150}
          height={50}
          crossOrigin="anonymous"
        />
        <TooltipUI content="Como jogar?" side="bottom">
          <button
            className={styles.helpButton}
            type="button"
            onClick={openOnboarding}
          >
            <div>
              <HelpOutilineIcon />
              <HelpOutilineIcon />
            </div>
          </button>
        </TooltipUI>
      </div>
      <Profile />
    </header>
  );
};

export default Header;
