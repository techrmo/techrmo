import { forwardRef } from 'react';

import KeyUI from '../Keyboard/KeyUI/KeyUI';

import styles from './styles.module.scss';

import { Logo } from '@/shared/assets/icons/Logo';

export const ShareComponent = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div id="screenshot" ref={ref} className={styles.shareComponent}>
      <Logo />
      <p>
        <span>Tsunode</span> acertou a palavra do dia!
      </p>
      <div>
        <div>
          <KeyUI value="V" variant="correct" />
          <KeyUI value="E" variant="correct" />
          <KeyUI value="N" variant="correct" />
          <KeyUI value="H" variant="correct" />
          <KeyUI value="A" variant="correct" />
          <KeyUI value="Y" variant="incorrect" />
          <KeyUI value="U" variant="incorrect" />
          <KeyUI value="I" variant="incorrect" />
          <KeyUI value="O" variant="incorrect" />
          <KeyUI value="P" variant="incorrect" />
        </div>
        <div>
          <KeyUI value="A" variant="incorrect" />
          <KeyUI value="S" variant="incorrect" />
          <KeyUI value="D" variant="incorrect" />
          <KeyUI value="J" variant="bad-position" />
          <KeyUI value="O" variant="bad-position" />
          <KeyUI value="G" variant="bad-position" />
          <KeyUI value="A" variant="bad-position" />
          <KeyUI value="R" variant="bad-position" />
          <KeyUI value="L" variant="incorrect" />
          <KeyUI value="<" variant="incorrect" />
        </div>
        <div>
          <KeyUI value="T" variant="correct" />
          <KeyUI value="A" variant="correct" />
          <KeyUI value="M" variant="correct" />
          <KeyUI value="B" variant="correct" />
          <KeyUI value="É" variant="correct" />
          <KeyUI value="M" variant="correct" />
          <KeyUI value="techrmo.app" variant="bad-position" />
        </div>
      </div>
    </div>
  );
});
