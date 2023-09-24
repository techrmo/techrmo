'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import styles from './styles.module.scss';

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={styles.container}>
          {user.username}
          <img src={user.imageUrl} alt={`Perfil do ${user.username || ''}`} />
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
