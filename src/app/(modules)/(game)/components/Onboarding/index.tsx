'use client';

import { useEffect, useState } from 'react';
import ReactJoyride, {
  ACTIONS,
  CallBackProps,
  LIFECYCLE,
  Step,
} from 'react-joyride';
import { shallow } from 'zustand/shallow';

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
import Key from './Steps/Key';
import FinalStep from './Steps/FinalStep';

const Onboarding = () => {
  const {
    setFormOnboarding,
    resetValuesOnboarding,
    setValuesBackupOnboarding,
  } = useFormStore(
    (store) => ({
      setFormOnboarding: store.setFormOnboarding,
      resetValuesOnboarding: store.resetValuesOnboarding,
      setValuesBackupOnboarding: store.setValuesBackupOnboarding,
    }),
    shallow
  );
  const {
    setKeyboardOnboarding,
    resetKeyboardOnboarding,
    setUsedKeysBackupOnboarding,
  } = useKeysStore(
    (store) => ({
      setKeyboardOnboarding: store.setKeyboardOnboarding,
      resetKeyboardOnboarding: store.resetKeyboardOnboarding,
      setUsedKeysBackupOnboarding: store.setUsedKeysBackupOnboarding,
    }),
    shallow
  );
  const { isOpenOnboarding, openOnboarding } = useOnboardingStore(
    (store) => ({
      isOpenOnboarding: store.isOpenOnboarding,
      openOnboarding: store.openOnboarding,
    }),
    shallow
  );

  const [steps] = useState<Step[]>([
    {
      target: 'body',
      content: <InputStep />,
      disableBeacon: true,
      placement: 'center',
      styles: {
        options: {
          arrowColor: 'transparent',
        },
      },
    },
    {
      target: '.input-row',
      content: <InputStep2 />,
      offset: -5,
    },
    {
      target: '.input-row',
      content: <InputStep3 />,
      offset: -5,
    },
    {
      target: '.input-box-1',
      content: <InputStep4 />,
      offset: -5,
    },
    {
      target: '.input-box-3',
      content: <InputStep5 />,
      offset: -5,
    },
    {
      target: '.input-box-2',
      content: <InputStep6 />,
      offset: -5,
    },
    {
      target: '.keyboard',
      content: <Key />,
      offset: -5,
    },
    {
      target: '.key-C',
      content: <KeyStep1 />,
      offset: -5,
    },
    {
      target: '.key-E',
      content: <KeyStep2 />,
      offset: -5,
    },
    {
      target: '.key-A',
      content: <KeyStep3 />,
      offset: -5,
    },
    {
      target: 'body',
      content: <FinalStep />,
      placement: 'center',
      styles: {
        options: {
          arrowColor: 'transparent',
        },
      },
    },
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpenOnboarding) {
      setUsedKeysBackupOnboarding();
      setValuesBackupOnboarding();
      return;
    }
  }, [isOpenOnboarding]);

  if (!mounted) {
    return null;
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, action, lifecycle } = data;

    console.log(index, action, lifecycle);

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

    if (lifecycle === LIFECYCLE.TOOLTIP && index === 1) {
      setFormOnboarding(['R', 'E', 'A', 'C', 'T']);
    }

    if (action === ACTIONS.CLOSE || action === ACTIONS.RESET) {
      openOnboarding();
      resetKeyboardOnboarding();
      resetValuesOnboarding();
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
