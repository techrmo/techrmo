import { NextResponse } from 'next/server';

import { getCurrentUserInSession } from '@/shared/services/getCurrentUserInSession';

import { apiHandler } from '../../../helpers/apiHandler';
import { AuthError } from '../../../(errors)/AuthError';
import { getPlayerByUid } from '../../../(services)';

async function ShowUserLogged() {
  const user = await getCurrentUserInSession();

  if (!user) {
    throw new AuthError('Usuário não autenticado', 401);
  }

  try {
    const userLogged = await getPlayerByUid(user.uid);
    return NextResponse.json(userLogged, { status: 200 });
  } catch (error) {
    throw new AuthError('Usuário não autenticado', 401);
  }
}

export const { GET } = apiHandler({
  GET: ShowUserLogged,
});
