import { ComponentProps, ReactNode } from 'react';

import styles from './styles.module.scss';

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => (
  <button className={styles.container} {...rest}>
    {children}
  </button>
);

export default Button;
