'use client';

import { useRouter } from 'next/navigation';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '@/shared/services/firebase';
import { api } from '@/shared/services/api';
import Button from '@/shared/components/ui/Button';

import MdiGithub from '@/shared/assets/icons/MdiGithub';

const LoginButton = () => {
  const router = useRouter();
  const provider = new GithubAuthProvider();
  const defaultButtonText = 'Login com Github';
  const [buttonText, setButtonText] = useState(defaultButtonText);

  const handleLogin = async () => {
    setButtonText('Carregando...');
    try {
      const response = await signInWithPopup(auth, provider);

      console.log(response);

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
      router.push('game');
    } catch (error) {
      console.error('error', error);
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
