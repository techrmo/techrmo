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
});

export const publicEnvs = schema.parse({
  NEXT_PUBLIC_API_URL: process.env['NEXT_PUBLIC_API_URL'],
  NEXT_PUBLIC_GRAPHCMS_URL: process.env['NEXT_PUBLIC_GRAPHCMS_URL'],
  NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS'],
});
