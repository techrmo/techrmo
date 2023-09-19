'use client';

import { signIn } from 'next-auth/react';

interface LoginButtonProps {
  providerName: string;
  providerId: string;
}

const LoginButton = ({ providerName, providerId }: LoginButtonProps) => {
  return (
    <button key={providerName} type="button" onClick={() => signIn(providerId)}>
      Entrar com {providerName}
    </button>
  );
};

export default LoginButton;
