import { ReactNode } from 'react';

import LoadingUI from '@/shared/components/ui/Loading';
import { useFormStore } from '@/app/(modules)/(game)/stores/Form';

import styles from './styles.module.scss';

interface InputRowProps {
  children: ReactNode;
  onboarding: boolean;
}

const InputRow = ({ children, onboarding }: InputRowProps) => {
  const isLoading = useFormStore((state) => state.isLoading);

  const classOnboarding = onboarding ? 'input-row' : '';

  return (
    <>
      <LoadingUI isLoading={isLoading} />
      <form className={`${styles.container} ${classOnboarding}`}>
        {children}
      </form>
    </>
  );
};

export default InputRow;
