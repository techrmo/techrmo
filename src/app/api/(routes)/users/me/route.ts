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

  const userLogged = await getPlayerByUid(user.uid);

  return NextResponse.json(userLogged, { status: 200 });
}

export const { GET } = apiHandler({
  GET: ShowUserLogged,
});
