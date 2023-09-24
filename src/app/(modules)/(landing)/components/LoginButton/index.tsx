'use client';

import { useSignIn } from '@clerk/nextjs';

import styles from './styles.module.scss';

import MdiGithub from '@/shared/assets/icons/MdiGithub';

const LoginButton = () => {
  const { signIn } = useSignIn();

  const handleLogin = async () => {
    const teste = await signIn?.authenticateWithRedirect({
      strategy: 'oauth_github',
      redirectUrl: '/game',
      redirectUrlComplete: '/game',
    });

    console.log(teste);
  };

  return (
    <button
      className={`${styles.container} login-button`}
      type="button"
      onClick={handleLogin}
    >
      <MdiGithub /> Entrar com Github
    </button>
  );
};

export default LoginButton;
