/* eslint-disable dot-notation */
import { z } from 'zod';

const schema = z.object({
  GRAPHCMS_MUTATION_TOKEN: z.string(),
  OPENAI_API_TOKEN: z.string(),
  TOKEN_API: z.string(),
});

export const privateEnvs = schema.parse({
  GRAPHCMS_MUTATION_TOKEN: process.env['GRAPHCMS_MUTATION_TOKEN'],
  OPENAI_API_TOKEN: process.env['OPENAI_API_TOKEN'],
  TOKEN_API: process.env['TOKEN_API'],
});
