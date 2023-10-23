import { forwardRef } from 'react';

import type { InputBoxVariant } from '@/app/(modules)/(game)/hooks/useInputVariant';

import styles from './styles.module.scss';

interface InputBoxProps {
  wordSize?: number;
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
      wordSize,
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
        data-word-size={wordSize}
        pattern="[a-zA-Z]"
        onFocus={handleFocus}
        translate="no"
      />
    );
  }
);

export default InputBoxUI;
