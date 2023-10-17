'use client';

import { useEffect, useState } from 'react';
import ReactJoyride, {
  type CallBackProps,
  type Step,
  ACTIONS,
  LIFECYCLE,
} from 'react-joyride';
import { useShallow } from 'zustand/react/shallow';

import { useOnboardingStore } from '@/shared/stores/onboardingStore';

import { useFormStore } from '../../stores/Form';
import { useKeysStore } from '../../stores/KeysStore';
import { useResultStore } from '../../stores/ResultStore';

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
    useShallow((store) => ({
      setFormOnboarding: store.setFormOnboarding,
      resetValuesOnboarding: store.resetValuesOnboarding,
      setValuesBackupOnboarding: store.setValuesBackupOnboarding,
    }))
  );
  const { resetResultOnboarding, setResultBackupOnboarding } = useResultStore(
    useShallow((store) => ({
      resetResultOnboarding: store.resetResultOnboarding,
      setResultBackupOnboarding: store.setResultBackupOnboarding,
    }))
  );
  const {
    setKeyboardOnboarding,
    resetKeyboardOnboarding,
    setUsedKeysBackupOnboarding,
    setDisableAllKeys,
  } = useKeysStore(
    useShallow((store) => ({
      setKeyboardOnboarding: store.setKeyboardOnboarding,
      resetKeyboardOnboarding: store.resetKeyboardOnboarding,
      setUsedKeysBackupOnboarding: store.setUsedKeysBackupOnboarding,
      setDisableAllKeys: store.setDisableAllKeys,
    }))
  );
  const { isOpenOnboarding, openOnboarding } = useOnboardingStore(
    useShallow((store) => ({
      isOpenOnboarding: store.isOpenOnboarding,
      openOnboarding: store.openOnboarding,
    }))
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
      setResultBackupOnboarding();
      setDisableAllKeys(true);
      return;
    }
  }, [isOpenOnboarding]);

  if (!mounted) {
    return null;
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, action, lifecycle } = data;

    if (lifecycle === LIFECYCLE.TOOLTIP && index >= 2) {
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
      resetResultOnboarding();
      setDisableAllKeys(false);
    }
  };

  return (
    <ReactJoyride
      run={isOpenOnboarding}
      disableOverlay
      disableScrollParentFix
      disableScrolling
      showProgress
      continuous
      callback={handleJoyrideCallback}
      locale={{
        next: 'Próximo',
        close: 'Fechar',
        back: 'Voltar',
        last: 'Fechar',
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
    />
  );
};

export default Onboarding;
