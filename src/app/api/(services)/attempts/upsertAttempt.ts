import type { GameStatus } from '@/shared/constants/GameStatus';

import { getCollection } from '../firebaseAdmin/firestore';

import { ResultValidation } from './validators';

export type AttemptValues = Record<string, ResultValidation[]>;

interface AttemptData {
  status: GameStatus;
  word: string;
  userUid: string;
  values: AttemptValues;
}

export const upsertAttempt = async ({
  userUid,
  word,
  values,
  status,
}: AttemptData) => {
  await getCollection('attemps').doc(`${word}-${userUid}`).set(
    {
      values,
      status,
      word,
      userUid,
    },
    { merge: true }
  );
};
