import { type ComponentProps, type ReactNode, forwardRef } from 'react';

import styles from './styles.module.scss';

export type ButtonVariant =
  | 'outlined-green'
  | 'outlined-yellow'
  | 'outlined-red'
  | 'contained-green'
  | 'contained-yellow'
  | 'text-green'
  | 'text-yellow';

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'outlined-green',
      size = 'medium',
      className,
      ...rest
    }: ButtonProps,
    ref
  ) => (
    <button
      ref={ref}
      className={`${className || ''} ${styles.container} `}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
    </button>
  )
);

export default Button;
