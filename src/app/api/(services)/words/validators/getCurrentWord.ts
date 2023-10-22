import { z } from 'zod';

const currentWordSchema = z.object({
  value: z.string().length(5, {
    message: 'Must be a string with a length of 5 characters',
  }),
  explanations: z.array(z.string()),
  id: z.string({
    required_error: 'Must be a valid UUID',
  }),
});

export const getCurrentWordSchema = z.object({
  words: z.array(currentWordSchema),
});

export type SecretWord = z.infer<typeof currentWordSchema>;
