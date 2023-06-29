/* eslint-disable dot-notation */
import { TypeOf, z } from 'zod';

const withDevDefault = <T extends z.ZodTypeAny>(
  schema: T,
  val: TypeOf<T>,
) => (process.env.NODE_ENV !== 'production' ? schema.default(val) : schema);

const schema = z.object({
  NEXT_PUBLIC_API_URL: withDevDefault(z.string().url(), 'http://localhost:3000/api'),
  NEXT_PUBLIC_GRAPHCMS_URL: z.string().url(),
  GRAPHCMS_MUTATION_TOKEN: z.string(),
  OPENAI_API_TOKEN: z.string(),
});

export const parsedEnvs = schema.parse({
  NEXT_PUBLIC_API_URL: process.env['NEXT_PUBLIC_API_URL'],
  NEXT_PUBLIC_GRAPHCMS_URL: process.env['NEXT_PUBLIC_GRAPHCMS_URL'],
  GRAPHCMS_MUTATION_TOKEN: process.env['GRAPHCMS_MUTATION_TOKEN'],
  OPENAI_API_TOKEN: process.env['OPENAI_API_TOKEN'],
});
