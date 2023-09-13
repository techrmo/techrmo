import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';

import { authOptions } from '../[...nextauth]/route';

import LoginButton from './LoginButton';

/**
 * Temporariamente desativado
 */
const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/');
  }

  const providers = await getProviders();

  const providersInArray = providers ? Object.values(providers) : [];

  return providersInArray.map((provider) => (
    <LoginButton
      key={provider.name}
      providerId={provider.id}
      providerName={provider.name}
    />
  ));
};

export default SignIn;
