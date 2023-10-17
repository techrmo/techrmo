'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import { auth as AuthFirebase } from '@/shared/services/firebase';
import { api } from '@/shared/services/api';
import { useUserStore } from '@/shared/stores/userStore';

import styles from './styles.module.scss';

import defaultProfile from '@/shared/assets/defaultProfile.png';

const Profile = () => {
  const router = useRouter();
  const user = useUserStore((store) => store.user);
  const setUser = useUserStore((store) => store.setUser);

  const handleSignOut = async () => {
    await signOut(AuthFirebase);
    await api.post('signOut');
    setUser(null);

    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={styles.container}>
          <img
            src={user.profileImage || defaultProfile.src}
            alt={`Perfil do ${user.name}`}
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
          <DropdownMenu.Label className={styles.dropdownMenuLabel}>
            Logado como {user.name}
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
