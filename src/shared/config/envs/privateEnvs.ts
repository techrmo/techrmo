/* eslint-disable dot-notation */
import { z } from 'zod';

const schema = z.object({
  GRAPHCMS_MUTATION_TOKEN: z.string(),
  OPENAI_API_TOKEN: z.string(),
  TOKEN_API: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  FIREBASE_AUTH_PROJECT_ID: z.string(),
  FIREBASE_AUTH_PRIVATE_KEY: z.string(),
  FIREBASE_AUTH_CLIENT_EMAIL: z.string(),
  GITHUB_TOKEN: z.string(),
});

export const privateEnvs = schema.parse({
  GRAPHCMS_MUTATION_TOKEN: process.env['GRAPHCMS_MUTATION_TOKEN'],
  OPENAI_API_TOKEN: process.env['OPENAI_API_TOKEN'],
  TOKEN_API: process.env['TOKEN_API'],
  GITHUB_ID: process.env['GITHUB_ID'],
  GITHUB_SECRET: process.env['GITHUB_SECRET'],
  FIREBASE_AUTH_PROJECT_ID: process.env['FIREBASE_AUTH_PROJECT_ID'],
  FIREBASE_AUTH_PRIVATE_KEY: process.env['FIREBASE_AUTH_PRIVATE_KEY'],
  FIREBASE_AUTH_CLIENT_EMAIL: process.env['FIREBASE_AUTH_CLIENT_EMAIL'],
  GITHUB_TOKEN: process.env['GITHUB_TOKEN'],
});
