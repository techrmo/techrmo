'use client';

import { useEffect, useState } from 'react';
import ReactJoyride, {
  ACTIONS,
  CallBackProps,
  LIFECYCLE,
  Step,
} from 'react-joyride';

import { useOnboardingStore } from '@/shared/stores/onboardingStore';

import { useFormStore } from '../../stores/Form';
import { useKeysStore } from '../../stores/KeysStore';

import InputStep from './Steps/Input';
import InputStep2 from './Steps/Input2';
import InputStep3 from './Steps/Input3';
import InputStep4 from './Steps/Input4';
import InputStep5 from './Steps/Input5';
import InputStep6 from './Steps/Input6';
import KeyStep1 from './Steps/Key1';
import KeyStep2 from './Steps/Key2';
import KeyStep3 from './Steps/Key3';

const Onboarding = () => {
  const setFormOnboarding = useFormStore((store) => store.setFormOnboarding);
  const setKeyboardOnboarding = useKeysStore(
    (store) => store.setKeyboardOnboarding
  );
  const isOpenOnboarding = useOnboardingStore(
    (store) => store.isOpenOnboarding
  );
  const openOnboarding = useOnboardingStore((store) => store.openOnboarding);
  const [steps] = useState<Step[]>([
    {
      target: '.input-row',
      content: <InputStep />,
      disableBeacon: true,
    },
    {
      target: '.input-row',
      content: <InputStep2 />,
    },
    {
      target: '.input-row',
      content: <InputStep3 />,
    },
    {
      target: '.input-box-1',
      content: <InputStep4 />,
    },
    {
      target: '.input-box-3',
      content: <InputStep5 />,
    },
    {
      target: '.input-box-2',
      content: <InputStep6 />,
    },
    {
      target: '.keyboard',
      content: 'Aqui você usará para digitar as letras das tentativas',
    },
    {
      target: '.key-C',
      content: <KeyStep1 />,
    },
    {
      target: '.key-E',
      content: <KeyStep2 />,
    },
    {
      target: '.key-A',
      content: <KeyStep3 />,
    },
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, action, lifecycle } = data;

    if (lifecycle === LIFECYCLE.TOOLTIP && index >= 2 && index <= 5) {
      setFormOnboarding(
        ['R', 'E', 'A', 'C', 'T'],
        ['incorrect', 'correct', 'incorrect', 'bad-position', 'incorrect']
      );
      setKeyboardOnboarding({
        R: 'incorrect',
        E: 'correct',
        A: 'incorrect',
        C: 'bad-position',
        T: 'incorrect',
      });
      return;
    }

    if (index === 1) {
      setFormOnboarding(['R', 'E', 'A', 'C', 'T']);
    }

    if (action === ACTIONS.CLOSE || action === ACTIONS.RESET) {
      openOnboarding();
      setFormOnboarding([]);
      setKeyboardOnboarding({});
    }
  };

  return (
    <ReactJoyride
      run={isOpenOnboarding}
      disableOverlay
      disableScrollParentFix
      disableScrolling
      showProgress
      callback={handleJoyrideCallback}
      locale={{
        next: 'Próximo',
        close: 'Fechar',
        back: 'Voltar',
        last: 'Último',
        open: 'Abrir',
        skip: 'Pular',
      }}
      steps={steps}
      styles={{
        options: {
          arrowColor: '#2B2B2B',
          backgroundColor: '#2B2B2B',
          textColor: '#ffffff',
          primaryColor: '#FFE927',
        },
        tooltipContent: {
          padding: 5,
          marginTop: 20,
        },
        buttonNext: {
          color: '#000000',
          borderRadius: 20,
          paddingInline: 15,
        },
        overlay: {
          overflow: 'hidden',
        },
      }}
      continuous
    />
  );
};

export default Onboarding;
