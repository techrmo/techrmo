import { NextResponse, NextRequest } from 'next/server';

import { getStatus } from '@/shared/helpers/getStatusAttempt';
import { getCurrentUser } from '@/shared/services/getCurrentUser';

import { getCurrentWord } from '../../(services)/words';
import { wordValidationRequest } from '../../(services)/words/validators';
import {
  getCurrentAttemptPlayer,
  upsertAttempt,
} from '../../(services)/attempts';
import { letterResult } from '../../(services)/attempts/validators/attemptValues';
import { apiHandler } from '../../helpers/apiHandler';
import { AppError } from '../../(errors)/AppError';

async function POST(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    throw new AppError('Usuário não autenticado', 401);
  }

  if (!user.email) {
    throw new AppError('Usuário não autenticado', 401);
  }

  const secretWord = await getCurrentWord();

  const { values: parsedValues } = wordValidationRequest.parse(
    await request.json()
  );

  if (!secretWord) {
    throw new AppError('Palavra não encontrada.', 400);
  }

  const secretWordArray = secretWord.value.toUpperCase().split('');

  const currentAttempt = await getCurrentAttemptPlayer(user.email);

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

  const resultOfAttempt = currentAttempt
    ? [...currentAttempt.values, results]
    : [results];

  const isWinner = results.every((result) => result.result === 'correct');
  const isLost = !isWinner && resultOfAttempt.length === 7; // @todo deixar número de tentativa em env ou banco

  const status = getStatus(isWinner, isLost);

  await upsertAttempt({
    email: user.email,
    status,
    word: secretWord.value,
    values: resultOfAttempt,
    id: currentAttempt?.id,
  });

  return NextResponse.json({
    results,
    status,
    explanations: status !== 'PLAYING' ? secretWord.explanations : [],
  });
}

module.exports = apiHandler({ POST });
