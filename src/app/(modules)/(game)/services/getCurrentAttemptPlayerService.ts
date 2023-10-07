import { getCurrentAttemptPlayer } from '@/app/api/(services)/attempts';
import { getCurrentWord } from '@/app/api/(services)/words';
import type { GameStatus } from '@/shared/constants/GameStatus';
import { getCurrentUser } from '@/shared/services/getCurrentUser';

import { allowedColumnIndexes } from '../stores/Form/FormSlice';

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

  return allowedColumnIndexes[resultsOfAttemptsLength] ?? 0;
};

export const getCurrentAttemptPlayerService = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  if (!user.email) {
    return;
  }

  const attempt = await getCurrentAttemptPlayer(user.email);

  if (!attempt) {
    return;
  }

  const { values: currentAttempt } = attempt;

  const resultsOfAttempts = currentAttempt.map((current) =>
    current.map((item) => item.result)
  );

  const values = currentAttempt.map((current) =>
    current.map((item) => item.value)
  );

  const keyResult = currentAttempt.reduce(
    (accumulator, current) => [...accumulator, ...current],
    []
  );

  const result = await getResult(attempt.statusAttempt);

  return {
    keyResult,
    response: result?.value || '',
    explanations: result?.explanations,
    status: attempt.statusAttempt,
    resultsOfAttempts,
    values: [...values, []],
    currentRowIndex: getCurrentRowIndex(
      resultsOfAttempts.length,
      attempt.statusAttempt
    ),
  };
};
