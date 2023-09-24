'use client';

import { useEffect, useState } from 'react';
import ReactJoyride, {
  ACTIONS,
  CallBackProps,
  LIFECYCLE,
  Step,
} from 'react-joyride';

import { useFormStore } from '../../stores/Form';

import InputStep from './Steps/Input';
import InputStep2 from './Steps/Input2';
import InputStep3 from './Steps/Input3';
import InputStep4 from './Steps/Input4';
import InputStep5 from './Steps/Input5';
import InputStep6 from './Steps/Input6';

const Onboarding = () => {
  const setFormOnboarding = useFormStore((store) => store.setFormOnboarding);
  const [steps] = useState<Step[]>([
    {
      target: '.input-row',
      content: <InputStep />,
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

    if (lifecycle === LIFECYCLE.TOOLTIP && index >= 3 && index <= 6) {
      setFormOnboarding(
        ['R', 'E', 'A', 'C', 'T'],
        ['incorrect', 'correct', 'incorrect', 'bad-position', 'incorrect']
      );
    }

    if (action === ACTIONS.CLOSE || action === ACTIONS.RESET) {
      setFormOnboarding([]);
    }
  };

  return (
    <ReactJoyride
      disableScrolling={true}
      callback={handleJoyrideCallback}
      showProgress
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
