/* eslint-disable dot-notation */
import { z } from 'zod';

import { withDevDefault } from './withDevDefault';

const schema = z.object({
  NEXT_PUBLIC_API_URL: withDevDefault(
    z.string().url(),
    'http://localhost:3000/api'
  ),
  NEXT_PUBLIC_GRAPHCMS_URL: withDevDefault(
    z.string().url(),
    'http://localhost:3000/api'
  ),
  NEXT_PUBLIC_GOOGLE_ANALYTICS: withDevDefault(z.string(), 'no-tag'),
  NEXT_PUBLIC_FIREBASE_API_KEY: withDevDefault(z.string(), 'no-tag'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: withDevDefault(z.string(), 'no-tag'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: withDevDefault(z.string(), 'no-tag'),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: withDevDefault(z.string(), 'no-tag'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: withDevDefault(
    z.string(),
    'no-tag'
  ),
  NEXT_PUBLIC_FIREBASE_APP_ID: withDevDefault(z.string(), 'no-tag'),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: withDevDefault(z.string(), 'no-tag'),
});

export const publicEnvs = schema.parse({
  NEXT_PUBLIC_API_URL: process.env['NEXT_PUBLIC_API_URL'],
  NEXT_PUBLIC_GRAPHCMS_URL: process.env['NEXT_PUBLIC_GRAPHCMS_URL'],
  NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS'],
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env['NEXT_PUBLIC_FIREBASE_API_KEY'],
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
  NEXT_PUBLIC_FIREBASE_PROJECT_ID:
    process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env['NEXT_PUBLIC_FIREBASE_APP_ID'],
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
    process.env['NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'],
});
