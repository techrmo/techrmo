'use client';

import { useSignIn } from '@clerk/nextjs';

import styles from './styles.module.scss';

import MdiGithub from '@/shared/assets/icons/MdiGithub';

const LoginButton = () => {
  const { signIn } = useSignIn();

  return (
    <button
      className={`${styles.container} login-button`}
      type="button"
      onClick={async () => {
        await signIn?.authenticateWithRedirect({
          strategy: 'oauth_github',
          redirectUrl: 'http://localhost:3000',
          redirectUrlComplete: '/',
        });
      }}
    >
      <MdiGithub /> Entrar com Github
    </button>
  );
};

export default LoginButton;
