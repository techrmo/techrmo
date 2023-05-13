import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface RowInputProps {
  children: ReactNode;
}

const RowInput = ({ children }: RowInputProps) => (
  <div className={styles.container}>
    {children}
  </div>
);

export default RowInput;
