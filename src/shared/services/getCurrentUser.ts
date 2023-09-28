import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';

import { customInitApp } from '@/app/api/(services)/frebaseAdmin/firebaseAdmin';

customInitApp();

export const getCurrentUser = async () => {
  const session = cookies().get('session')?.value || '';

  if (!session) {
    return null;
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);

  return decodedClaims;
};
