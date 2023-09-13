import { ReactNode } from 'react';

import LoadingUI from '@/shared/components/LoadingUI';

import { useFormStore } from '../../../stores/Form';

import styles from './styles.module.scss';

interface InputRowProps {
  children: ReactNode;
}

const InputRow = ({ children }: InputRowProps) => {
  const isLoading = useFormStore((state) => state.isLoading);

  return (
    <>
      <LoadingUI isLoading={isLoading} />
      <form className={styles.container}>{children}</form>
    </>
  );
};

export default InputRow;
