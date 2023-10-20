import { gql } from 'graphql-request';

import { requestGraphQl } from '../hygraph';
import { getCollection } from '../firebaseAdmin/firestore';

import { getCurrentAttemptPlayerSchema } from './validators';

interface GetCurrentAttempData {
  word: string;
  userUid: string;
}

export const getCurrentAttemptPlayer = async ({
  word,
  userUid,
}: GetCurrentAttempData) => {
  const response = await getCollection('attempts')
    .doc(word)
    .collection('players')
    .doc(userUid)
    .get();

  if (!response.exists) {
    return;
  }

  const attempt = getCurrentAttemptPlayerSchema.parse(response.data());

  return attempt;
};
