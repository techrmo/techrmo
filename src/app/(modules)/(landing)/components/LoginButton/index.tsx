'use client';

import { useState } from 'react';

import Button from '@/shared/components/ui/Button';
import { useToastStore } from '@/shared/stores/toastStore';

import MdiGithub from '@/shared/assets/icons/MdiGithub';

const LoginButton = () => {
  const addToast = useToastStore((store) => store.addToast);

  const [isDisableButton, setIsDisableButton] = useState(false);

  const handleLogin = () => {
    setIsDisableButton(true);
    addToast({
      title: 'Calma, Calma!',
      description:
        'Você poderá jogar após a live de sexta, 20/10 às 19h no canal tsu.node',
      variant: 'success',
      duration: 10000,
    });
  };

  return (
    <Button
      variant="outlined-yellow"
      type="button"
      disabled={isDisableButton}
      onClick={handleLogin}
    >
      <MdiGithub />
      Login com Github
    </Button>
  );
};

export default LoginButton;
