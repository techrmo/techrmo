import type { Keys } from '@/shared/constants/Keys';
import { LetterResult } from '@/app/(modules)/(game)/validators/responseWords';

import styles from './styles.module.scss';

interface KeyUIProps {
  variant: LetterResult | undefined;
  value: Keys;
  disabled: boolean;
  handleKeyUp?: () => void;
}

const KeyUI = ({ value, variant, disabled, handleKeyUp }: KeyUIProps) => {
  return (
    <button
      className={`${styles.container} key-${value}`}
      data-variant={variant}
      onClick={handleKeyUp}
      type="button"
      disabled={disabled}
      translate="no"
    >
      {value}
    </button>
  );
};

export default KeyUI;
