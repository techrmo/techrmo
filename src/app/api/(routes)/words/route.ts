import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import { getCurrentWord } from '../../(services)/words';
import { wordValidationRequest } from '../../(services)/words/validators';
import { authOptions } from '../auth/[...nextauth]/route';
import {
  getCurrentAttemptPlayer,
  upsertAttempt,
} from '../../(services)/attempts';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      {
        message: 'Usuário não autenticado',
      },
      { status: 401 }
    );
  }

  const secretWord = await getCurrentWord();

  const { values: parsedValues } = wordValidationRequest.parse(
    await request.json()
  );

  if (!secretWord) {
    return NextResponse.json(
      {
        message: 'Palavra não encontrada.',
      },
      { status: 404 }
    );
  }

  const secretWordArray = secretWord.value.toUpperCase().split('');

  const currentAttempt = await getCurrentAttemptPlayer(session.user.email);

  const results = parsedValues.map((letter, index) => {
    const letterUpperCase = letter.toUpperCase();

    if (letterUpperCase === secretWordArray[index]) {
      return {
        value: letterUpperCase,
        result: 'correct',
      };
    }

    if (secretWordArray.includes(letterUpperCase)) {
      return {
        value: letterUpperCase,
        result: 'bad-position',
      };
    }

    return {
      value: letterUpperCase,
      result: 'incorrect',
    };
  });

  await upsertAttempt({
    email: session.user.email,
    status: 'PLAYING',
    word: secretWord.value,
    values: currentAttempt ? [...currentAttempt.values, results] : [results],
    id: currentAttempt?.id,
  });

  return NextResponse.json({ results });
}
