'use client';

import { useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';

import { auth as FirebaseAuth } from '@/shared/services/firebase';

import { signOut } from '../../../services/signOutService';

import styles from './styles.module.scss';

import defaultProfile from '@/shared/assets/defaultProfile.png';

const Profile = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((response) => {
      setUser(response);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await Promise.all([firebaseSignOut(FirebaseAuth), signOut()]);

    router.push('/');
  };

  if (!user) {
    return null;
  }
  const { photoURL, displayName } = user;
  const profileImage = photoURL || defaultProfile.src;
  const profileImageAlt = `Perfil do ${displayName || ''}`;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={styles.container}>
          <img src={profileImage} alt={profileImageAlt} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdownMenuContent}
          sideOffset={5}
          side="bottom"
          align="end"
        >
          <DropdownMenu.Label className={styles.dropdownMenuLabel}>
            Logado como {displayName}
          </DropdownMenu.Label>

          <DropdownMenu.Item className={styles.dropdownMenuItem} disabled>
            Ranking (em breve)
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={styles.dropdownMenuItem}
            onSelect={handleSignOut}
          >
            Sair
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={styles.dropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Profile;
