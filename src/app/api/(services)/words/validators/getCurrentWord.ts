import { z } from 'zod';

export const getCurrentWordSchema = z.object({
  words: z.array(
    z
      .object({
        value: z.string().length(5, {
          message: 'Must be a string with a length of 5 characters',
        }),
        explanation: z.string().nullable(),
        id: z.string().nonempty({ message: 'Must be a valid UUID' }),
      })
      .optional()
  ),
});
