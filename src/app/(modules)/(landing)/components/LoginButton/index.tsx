'use client';

import { useRouter } from 'next/navigation';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import html2canvas from 'html2canvas';

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

  const handleDownloadImage = async () => {
    console.log('data');
    const element = document.getElementById('print'),
      canvas = await html2canvas(element!),
      data = canvas.toDataURL('image/jpg');

    const filesArray = [
      new File([data], `oi.png`, {
        type: 'image/png',
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      title: `oi`,
      files: filesArray,
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }

    // link = document.createElement('a');

    // link.href = data;
    // link.download = 'downloaded-image.jpg';

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <button
      id="print"
      className={styles.container}
      type="button"
      onClick={handleDownloadImage}
    >
      <MdiGithub /> Entrar com Github
    </button>
  );
};

export default LoginButton;
