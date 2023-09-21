import { NextResponse, NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs';

import { getCurrentWord } from '../../(services)/words';
import { wordValidationRequest } from '../../(services)/words/validators';
import {
  getCurrentAttemptPlayer,
  upsertAttempt,
} from '../../(services)/attempts';
import { letterResult } from '../../(services)/attempts/validators/attemptValues';

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      {
        message: 'Usuário não autenticado',
      },
      { status: 401 }
    );
  }

  const [firstEmail] = user.emailAddresses;

  if (!firstEmail) {
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
      { status: 400 }
    );
  }

  const secretWordArray = secretWord.value.toUpperCase().split('');

  const currentAttempt = await getCurrentAttemptPlayer(firstEmail.emailAddress);

  const results = parsedValues.map((letter, index) => {
    if (letter === secretWordArray[index]) {
      return {
        value: letter,
        result: letterResult.Values.correct,
      };
    }

    if (secretWordArray.includes(letter)) {
      return {
        value: letter,
        result: letterResult.Values['bad-position'],
      };
    }

    return {
      value: letter,
      result: letterResult.Values.incorrect,
    };
  });

  await upsertAttempt({
    email: firstEmail.emailAddress,
    status: 'PLAYING',
    word: secretWord.value,
    values: currentAttempt ? [...currentAttempt.values, results] : [results],
    id: currentAttempt?.id,
  });

  return NextResponse.json({ results });
}
