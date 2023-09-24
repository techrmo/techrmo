import { auth } from 'firebase-admin';
import { cookies } from 'next/headers';

export const getCurrentUser = async () => {
  const session = cookies().get('session')?.value || '';

  if (!session) {
    return null;
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);

  return decodedClaims;
};
