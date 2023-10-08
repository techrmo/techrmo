import Image from 'next/image';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

import keyboard from '@/shared/assets/keyboard.png';

export const ShareComponent = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className={styles.shareComponent}>
      <Image
        src="/logo.svg"
        alt="Logo techrmo"
        width={250}
        height={100}
        crossOrigin="anonymous"
      />

      <p>Tsunode acertou a palavra do dia</p>

      <Image
        src={keyboard}
        alt="Logo techrmo"
        crossOrigin="anonymous"
        width={150}
        height={50}
      />
    </div>
  );
});
