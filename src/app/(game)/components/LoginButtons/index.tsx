'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

const LoginButtons = () => {
  const session = useSession();

  const isAuthenticated = session.status === 'authenticated';

  return (
    <>
      {!isAuthenticated ? (
        <button type="button" onClick={() => signIn('github')}>
          Logar com github
        </button>
      ) : (
        <button type="button" onClick={() => signOut()}>
          Deslogar como {session.data.user?.name}
        </button>
      )}
    </>
  );
};

export default LoginButtons;
