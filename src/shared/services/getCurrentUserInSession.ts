import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';

import { customInitApp } from '@/app/api/(services)/firebaseAdmin/firebaseAdmin';

customInitApp();

export const getCurrentUserInSession = async () => {
  const session = cookies().get('session')?.value;

  if (!session) {
    return null;
  }

  try {
    const decodedClaims = await auth().verifySessionCookie(session, true);

    return decodedClaims;
  } catch (error) {
    console.error('eai', error);
    return null;
  }
};
