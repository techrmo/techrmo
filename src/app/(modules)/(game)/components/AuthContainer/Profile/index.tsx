'use client';

import { useClerk, useSignIn, useUser } from '@clerk/nextjs';

const Profile = () => {
  const { signIn } = useSignIn();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      {user ? (
        <>
          <p style={{ color: '#fff' }}>{user?.username}</p>
          <button onClick={() => signOut()}>Sair</button>
        </>
      ) : (
        <button
          type="button"
          onClick={async () => {
            await signIn?.authenticateWithRedirect({
              strategy: 'oauth_github',
              redirectUrl: 'http://localhost:3000',
              redirectUrlComplete: '/',
            });
          }}
        >
          Logar com github
        </button>
      )}
    </>
  );
};

export default Profile;
