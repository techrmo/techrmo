import type { Keys } from '@/shared/constants/Keys';
import { LetterResult } from '@/app/(modules)/(game)/validators/responseWords';

import styles from './styles.module.scss';

interface KeyUIProps {
  variant: LetterResult | undefined;
  value: Keys;
  handleKeyUp?: () => void;
}

const KeyUI = ({ value, variant, handleKeyUp }: KeyUIProps) => {
  return (
    <button
      className={`${styles.container} key-${value}`}
      data-variant={variant}
      onClick={handleKeyUp}
      type="button"
      translate="no"
    >
      {value}
    </button>
  );
};

export default KeyUI;
