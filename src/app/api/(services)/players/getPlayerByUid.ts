import { userSchema } from '@/shared/schema/userSchema';

import { getCollection } from '../firebaseAdmin/firestore';

export const getPlayerByUid = async (uid: string) => {
  const response = await getCollection('players').doc(uid).get();

  const player = userSchema.parse(response.data());

  return player;
};
