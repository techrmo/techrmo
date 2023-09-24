'use client';

import { useUser } from '@clerk/nextjs';

import LoginButton from '../../../(landing)/components/LoginButton';

import Profile from './Profile';

const AuthContainer = () => {
  const { user } = useUser();

  return user ? <Profile /> : <LoginButton />;
};

export default AuthContainer;
