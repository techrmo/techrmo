import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { publicEnvs } from '../config/envs/publicEnvs';

const firebaseConfig = {
  apiKey: publicEnvs.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: publicEnvs.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: publicEnvs.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: publicEnvs.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: publicEnvs.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: publicEnvs.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: publicEnvs.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
