import { forwardRef } from 'react';

import type { InputBoxVariant } from '@/app/(modules)/(game)/hooks/useInputVariant';

import styles from './styles.module.scss';

interface InputBoxProps {
  variant: InputBoxVariant;
  isActiveRow?: boolean;
  handleFocus?: () => void;
  defaultValue?: string;
  className?: string;
}

const InputBoxUI = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    { isActiveRow = true, variant, handleFocus, defaultValue, className = '' },
    ref
  ) => {
    return (
      <input
        defaultValue={defaultValue}
        ref={ref}
        className={`${styles.container} ${className}`}
        type="text"
        inputMode="none"
        autoComplete="off"
        maxLength={1}
        disabled={!isActiveRow}
        data-variant={variant}
        pattern="[a-zA-Z]"
        onFocus={handleFocus}
        translate="no"
      />
    );
  }
);

export default InputBoxUI;
