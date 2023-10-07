import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { auth } from 'firebase-admin';

import { apiHandler } from '../../helpers/apiHandler';
import { AppError } from '../../(errors)/AppError';
import { upsertPlayer } from '../../(services)/players';
import { AuthError } from '../../(errors)/AuthError';

async function POST() {
  const authorization = headers().get('Authorization');

  if (!authorization?.startsWith('Bearer ')) {
    throw new AuthError('Usuário não autorizado', 401);
  }

  const [, idToken] = authorization.split('Bearer ');

  if (!idToken) {
    throw new AuthError('Usuário não autorizado', 401);
  }

  const decodedToken = await auth().verifyIdToken(idToken);

  if (decodedToken) {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });

    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    cookies().set(options);
  }

  return NextResponse.json({}, { status: 200 });
}

async function GET() {
  const session = cookies().get('session')?.value;

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    throw new AppError('Usuário não autorizado', 401);
  }

  const { uid } = decodedClaims;

  const user = await auth().getUser(uid);

  if (!user.email || !user.displayName) {
    throw new AppError('Usuário não autorizado', 401);
  }

  upsertPlayer({
    email: user.email,
    image: user.photoURL,
    name: user.displayName,
  })
    .then(() => console.log(`Usuário ${uid} criado/atualizado`))
    .catch((error) =>
      console.error(`Não foi criar/atualizar o usuário ${uid}`, error)
    );

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

module.exports = apiHandler({ POST, GET });
