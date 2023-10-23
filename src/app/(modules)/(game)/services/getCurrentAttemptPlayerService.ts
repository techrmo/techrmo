import { getCurrentAttemptPlayer } from '@/app/api/(services)/attempts';
import type { GameStatus } from '@/shared/constants/GameStatus';
import { getCurrentUserInSession } from '@/shared/services/getCurrentUserInSession';
import type {
  ValuesAttempt,
  ResultValidation,
} from '@/app/api/(services)/attempts/validators';
import { SecretWord } from '@/app/api/(services)/words/validators';

import { allowedRowIndexes } from '../stores/Form/FormSlice';

function mapAttemptByField<T extends 'value' | 'result'>(
  attemptsNumbers: string[],
  currentAttempt: ValuesAttempt,
  field: T
): ResultValidation[T][][] {
  return attemptsNumbers.map((key) => {
    const current = currentAttempt[key];

    if (!current) {
      return [];
    }

    return current.map((item) => item[field]);
  });
}

const getResult = (status: GameStatus, word: SecretWord) => {
  if (['LOST', 'WIN'].includes(status)) {
    return word;
  }

  return {
    value: '',
    explanations: [],
  };
};

const getCurrentRowIndex = (
  resultsOfAttemptsLength: number,
  status: GameStatus
) => {
  if (status !== 'PLAYING') {
    return;
  }

  return allowedRowIndexes[resultsOfAttemptsLength] ?? 0;
};

export const getCurrentAttemptPlayerService = async (
  secretWord?: SecretWord
) => {
  const user = await getCurrentUserInSession();

  if (!user) {
    return;
  }

  if (!user.email) {
    return;
  }

  if (!secretWord) {
    return;
  }

  const attempt = await getCurrentAttemptPlayer({
    userUid: user.uid,
    word: secretWord?.value,
  });

  if (!attempt) {
    return;
  }

  const { values: currentAttempt } = attempt;

  const attemptsNumbers = Object.keys(currentAttempt);

  const resultsOfAttempts = mapAttemptByField(
    attemptsNumbers,
    currentAttempt,
    'result'
  );

  const values = mapAttemptByField(attemptsNumbers, currentAttempt, 'value');

  const keyResult = Object.values(currentAttempt).reduce(
    (accumulator, current) => [...accumulator, ...current],
    []
  );

  const result = getResult(attempt.status, secretWord);

  return {
    keyResult,
    response: result?.value || '',
    explanations: result?.explanations || [],
    status: attempt.status,
    resultsOfAttempts,
    values: [...values, []],
    currentRowIndex: getCurrentRowIndex(
      resultsOfAttempts.length,
      attempt.status
    ),
  };
};
