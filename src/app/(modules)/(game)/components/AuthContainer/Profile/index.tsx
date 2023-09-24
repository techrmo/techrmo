'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth as AuthFirebase } from '@/shared/services/firebase';
import { api } from '@/shared/services/api';

import styles from './styles.module.scss';

import defaultProfile from '@/shared/assets/defaultProfile.png';

const Profile = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = AuthFirebase.onAuthStateChanged((response) => {
      setUser(response);
    });

    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    await signOut(AuthFirebase);
    await api.post('signOut');

    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={styles.container}>
          {user.displayName}
          <img
            src={user.photoURL || defaultProfile.src}
            alt={`Perfil do ${user.displayName || ''}`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdownMenuContent}
          sideOffset={5}
          side="bottom"
          align="end"
        >
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
