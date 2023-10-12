import { type ComponentProps, type ReactNode, forwardRef } from 'react';

import styles from './styles.module.scss';

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?:
    | 'outlined-green'
    | 'outlined-yellow'
    | 'contained-green'
    | 'contained-yellow'
    | 'text-green'
    | 'text-yellow';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'outlined-green',
      size = 'medium',
      ...rest
    }: ButtonProps,
    ref
  ) => (
    <button
      ref={ref}
      className={styles.container}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
    </button>
  )
);

export default Button;
