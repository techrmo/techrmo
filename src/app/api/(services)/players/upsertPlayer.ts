import { gql } from 'graphql-request';
import {
  type CollectionReference,
  type UpdateData,
  getFirestore,
} from 'firebase-admin/firestore';

import app from '@/shared/services/firebase';

import { requestGraphQl } from '../hygraph';
import { getCollection } from '../firebaseAdmin/firestore';

interface UpsertPlayerData {
  image?: string;
  name?: string;
  email: string;
  uid: string;
}

export const upsertPlayer = async ({
  name,
  email,
  image,
  uid,
}: UpsertPlayerData) => {
  try {
    await getCollection('players').doc(uid).set({
      name,
      email,
      profileImage: image,
      uid,
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
