import { useState } from 'react';

import Button from '@/shared/components/ui/Button';

import { useResultStore } from '../../stores/ResultStore';

import styles from './styles.module.scss';

export const ExplanationsContainer = () => {
  const [step, setStep] = useState(0);
  const explanations = useResultStore((store) => store.explanations);

  const showNextButton = explanations.length > step + 1;
  const showPreviousButton = step !== 0;

  const changeStep = (action: 'NEXT' | 'PREVIOUS') => {
    setStep((actualStep) =>
      action === 'NEXT' ? actualStep + 1 : actualStep - 1
    );
  };

  return (
    <div className={styles.explanationContainer}>
      <p className={styles.explanation}>{explanations[step]}</p>
      <div>
        {showPreviousButton && (
          <Button
            size="small"
            variant="text-green"
            onClick={() => changeStep('PREVIOUS')}
          >
            Voltar
          </Button>
        )}
        {showNextButton && (
          <Button size="small" onClick={() => changeStep('NEXT')}>
            Próximo
          </Button>
        )}
      </div>
    </div>
  );
};
