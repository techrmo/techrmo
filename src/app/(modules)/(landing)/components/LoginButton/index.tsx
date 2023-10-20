'use client';

import { useRouter } from 'next/navigation';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '@/shared/services/firebase';
import { api } from '@/shared/services/api';
import Button from '@/shared/components/ui/Button';
import { useToastStore } from '@/shared/stores/toastStore';

import MdiGithub from '@/shared/assets/icons/MdiGithub';

const LoginButton = () => {
  const router = useRouter();
  const addToast = useToastStore((store) => store.addToast);
  const provider = new GithubAuthProvider();
  const defaultButtonText = 'Login com Github';
  const [buttonText, setButtonText] = useState(defaultButtonText);

  const handleLogin = async () => {
    setButtonText('Carregando...');
    try {
      const response = await signInWithPopup(auth, provider);

      await api.post(
        'login',
        {},
        {
          headers: {
            Authorization: `Bearer ${await response.user.getIdToken()}`,
          },
        }
      );

      setButtonText('Redirecionando...');
      addToast({
        title: 'Login realizado com sucesso!',
        description: 'Estamos te redirecionando para o jogo!',
        variant: 'success',
      });
      router.push('');
    } catch (error) {
      console.error('error', error);
      addToast({
        title: 'Algo deu errado no login!',
        description: 'Tente novamente.',
        variant: 'error',
      });
      setButtonText(defaultButtonText);
    }
  };

  return (
    <Button
      variant="outlined-yellow"
      type="button"
      disabled={buttonText !== defaultButtonText}
      onClick={handleLogin}
    >
      <MdiGithub />
      {buttonText}
    </Button>
  );
};

export default LoginButton;
