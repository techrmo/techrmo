import { NextResponse, NextRequest } from 'next/server';

import { getStatus } from '@/shared/helpers/getStatusAttempt';
import { getCurrentUserInSession } from '@/shared/services/getCurrentUserInSession';

import { getCurrentWord } from '../../(services)/words';
import { wordValidationRequest } from '../../(services)/words/validators';
import {
  getCurrentAttemptPlayer,
  upsertAttempt,
} from '../../(services)/attempts';
import { letterResult } from '../../(services)/attempts/validators/attemptValues';
import { apiHandler } from '../../helpers/apiHandler';
import { AppError } from '../../(errors)/AppError';
import { AuthError } from '../../(errors)/AuthError';

async function VerifyWord(request: NextRequest) {
  const user = await getCurrentUserInSession();

  if (!user) {
    throw new AuthError('Usuário não autenticado', 401);
  }

  if (!user.email) {
    throw new AuthError('Usuário não autenticado', 401);
  }

  const secretWord = await getCurrentWord();

  const { values: parsedValues } = wordValidationRequest.parse(
    await request.json()
  );

  if (!secretWord) {
    throw new AppError('Palavra não encontrada.', 400);
  }

  const secretWordArray = secretWord.value.toUpperCase().split('');

  const currentAttempt = await getCurrentAttemptPlayer({
    word: secretWord.value,
    userUid: user.uid,
  });

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

  const numberOfAttempts = currentAttempt
    ? Object.keys(currentAttempt.values).length
    : 0;
  const actualAttempt = numberOfAttempts + 1;

  const resultOfAttempt = currentAttempt
    ? { ...currentAttempt.values, [actualAttempt]: results }
    : { [actualAttempt]: results };

  const isWinner = results.every((result) => result.result === 'correct');
  const isLost = !isWinner && actualAttempt === 7; // @todo deixar número de tentativa em env ou banco

  const status = getStatus(isWinner, isLost);

  await upsertAttempt({
    userUid: user.uid,
    status,
    word: secretWord.value,
    values: resultOfAttempt,
  });

  return NextResponse.json({
    results,
    status,
    explanations: status !== 'PLAYING' ? secretWord.explanations : [],
    ...(status !== 'PLAYING' ? { response: secretWord.value } : {}),
  });
}

export const { POST } = apiHandler({ POST: VerifyWord });
