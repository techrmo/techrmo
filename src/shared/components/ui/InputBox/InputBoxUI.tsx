import { forwardRef } from 'react';

import type { InputBoxVariant } from '@/app/(modules)/(game)/hooks/useInputVariant';

import styles from './styles.module.scss';

interface InputBoxProps {
  variant: InputBoxVariant;
  isActiveRow?: boolean;
  isHidden?: boolean;
  handleFocus?: () => void;
  defaultValue?: string;
  className?: string;
}

const InputBoxUI = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    {
      isActiveRow = true,
      isHidden = false,
      variant,
      handleFocus,
      defaultValue,
      className = '',
    },
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
        data-hidden={isHidden}
        pattern="[a-zA-Z]"
        onFocus={handleFocus}
        translate="no"
      />
    );
  }
);

export default InputBoxUI;
