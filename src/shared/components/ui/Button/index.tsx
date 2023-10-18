import type { ComponentProps, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

import styles from './styles.module.scss';

export type ButtonVariant =
  | 'outlined-green'
  | 'outlined-yellow'
  | 'outlined-red'
  | 'contained-green'
  | 'contained-yellow'
  | 'text-green'
  | 'text-yellow';

interface ButtonProps extends Omit<ComponentProps<'button'>, 'ref'> {
  children: ReactNode;
  asChild?: boolean;
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  variant?: ButtonVariant;
}

const Button = ({
  className,
  asChild = false,
  variant = 'outlined-green',
  size = 'medium',
  ...rest
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className={`${className || ''} ${styles.container}`}
      data-variant={variant}
      data-size={size}
      {...rest}
    />
  );
};

export default Button;
