import { ReactNode } from 'react';

import LoadingUI from '@/shared/components/LoadingUI';
import { useFormStore } from '@/app/(modules)/(game)/stores/Form';

import styles from './styles.module.scss';

interface InputRowProps {
  children: ReactNode;
  isOnboarding: boolean;
}

const InputRow = ({ children, isOnboarding }: InputRowProps) => {
  const isLoading = useFormStore((state) => state.isLoading);

  const onboardingClassname = isOnboarding ? 'input-row' : '';

  return (
    <>
      <LoadingUI isLoading={isLoading} />
      <form className={`${styles.container} ${onboardingClassname}`}>
        {children}
      </form>
    </>
  );
};

export default InputRow;
