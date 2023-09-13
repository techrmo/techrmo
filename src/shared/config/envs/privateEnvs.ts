/* eslint-disable dot-notation */
import { z } from 'zod';

const schema = z.object({
  GRAPHCMS_MUTATION_TOKEN: z.string(),
  OPENAI_API_TOKEN: z.string(),
  TOKEN_API: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
});

export const privateEnvs = schema.parse({
  GRAPHCMS_MUTATION_TOKEN: process.env['GRAPHCMS_MUTATION_TOKEN'],
  OPENAI_API_TOKEN: process.env['OPENAI_API_TOKEN'],
  TOKEN_API: process.env['TOKEN_API'],
  GITHUB_ID: process.env['GITHUB_ID'],
  GITHUB_SECRET: process.env['GITHUB_SECRET'],
  NEXTAUTH_SECRET: process.env['NEXTAUTH_SECRET'],
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
});
