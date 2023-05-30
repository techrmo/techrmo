import { z } from 'zod';

const stringValidation = z.object({
  value: z.string()
    .length(1)
    .transform((string) => string.toLocaleUpperCase()),
  result: z.enum(['correct', 'incorrect', 'bad-position']),
});

export const responseWords = z.object({
  results: z.array(stringValidation).length(5),
});

export type ResponseWords = z.infer<typeof responseWords>
