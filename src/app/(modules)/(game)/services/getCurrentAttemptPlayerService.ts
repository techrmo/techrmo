import { getCurrentAttemptPlayer } from '@/app/api/(services)/attempts';
import { getCurrentWord } from '@/app/api/(services)/words';
import type { GameStatus } from '@/shared/constants/GameStatus';
import { getCurrentUserInSession } from '@/shared/services/getCurrentUserInSession';
import type {
  ValuesAttempt,
  ResultValidation,
} from '@/app/api/(services)/attempts/validators';

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

const getResult = async (status: GameStatus) => {
  if (['LOST', 'WIN'].includes(status)) {
    return getCurrentWord();
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

export const getCurrentAttemptPlayerService = async () => {
  const user = await getCurrentUserInSession();

  if (!user) {
    return;
  }

  if (!user.email) {
    return;
  }

  const secretWord = await getCurrentWord();

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

  const result = await getResult(attempt.status);

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
