import { TypeOf, z } from 'zod';

const withDevDefault = <T extends z.ZodTypeAny>(
  schema: T,
  val: TypeOf<T>,
) => (process.env.NODE_ENV !== 'production' ? schema.default(val) : schema);

const schema = z.object({
  NEXT_PUBLIC_API_URL: withDevDefault(z.string().url(), 'http://localhost:3000/api'),
});

export const envs = schema.parse(process.env);
