'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { getCookie } from 'cookies-next';

import { useToastStore } from '@/shared/stores/toastStore';

const VerifySession = () => {
  const router = useRouter();
  const addToast = useToastStore((store) => store.addToast);

  useLayoutEffect(() => {
    if (getCookie('session')) {
      addToast({
        variant: 'info',
        title: 'Parece que você tem uma sessãoa ativa!',
        description: 'Estamos te redirecionando para o jogo.',
      });
      router.push('game');
    }
  }, []);

  return null;
};

export default VerifySession;
