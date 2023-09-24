import { initializeApp, getApps, cert } from 'firebase-admin/app';

import { privateEnvs } from '@/shared/config/envs';

const FIREBASE_AUTH_PRIVATE_KEY_WITH_LINE_BREAK =
  privateEnvs.FIREBASE_AUTH_PRIVATE_KEY.replace(/\\n/g, '\n');

const firebaseAdminConfig = {
  credential: cert({
    projectId: privateEnvs.FIREBASE_AUTH_PROJECT_ID,
    clientEmail: privateEnvs.FIREBASE_AUTH_CLIENT_EMAIL,
    privateKey: FIREBASE_AUTH_PRIVATE_KEY_WITH_LINE_BREAK,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
