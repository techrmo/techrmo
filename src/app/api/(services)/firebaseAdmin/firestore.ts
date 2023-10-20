import { getFirestore } from 'firebase-admin/firestore';

export const getCollection = (name: string) => getFirestore().collection(name);
