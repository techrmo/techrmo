import { NextResponse } from 'next/server';

import { getCurrentUserInSession } from '@/shared/services/getCurrentUserInSession';

import { apiHandler } from '../../../helpers/apiHandler';
import { AuthError } from '../../../(errors)/AuthError';
import { getPlayerByEmail } from '../../../(services)';

async function ShowUserLogged() {
  const user = await getCurrentUserInSession();

  if (!user) {
    throw new AuthError('Usuário não autenticado', 401);
  }

  if (!user.email) {
    throw new AuthError('Usuário não autenticado', 401);
  }

  const userLogged = await getPlayerByEmail(user.email);

  return NextResponse.json(userLogged, { status: 200 });
}

export const { GET } = apiHandler({
  GET: ShowUserLogged,
});
