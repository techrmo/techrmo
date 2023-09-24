'use client';

import { useRouter } from 'next/navigation';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '@/shared/services/firebase';
import { api } from '@/shared/services/api';

import styles from './styles.module.scss';

import MdiGithub from '@/shared/assets/icons/MdiGithub';

const LoginButton = () => {
  const router = useRouter();
  const provider = new GithubAuthProvider();

  const handleLogin = async () => {
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
      router.push('game');
    } catch (error) {
      console.error('error', error);
    }
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
