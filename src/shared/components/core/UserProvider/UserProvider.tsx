'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/shared/stores/userStore';
import { getCurrentUser } from '@/shared/services/getCurrentUser';
import { auth as AuthFirebase } from '@/shared/services/firebase';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const store = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (store.user) {
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();

        store.setUser(user);
      } catch (error) {
        router.refresh();
        console.error(error);
      }
    };

    const unsub = AuthFirebase.onAuthStateChanged(() => fetchUser());

    return () => unsub && unsub();
  }, []);

  return <>{children}</>;
};
