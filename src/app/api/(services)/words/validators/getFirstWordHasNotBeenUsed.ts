import { z } from 'zod';

export const getFirstWordHasNotBeenUsedSchema = z.object({
  words: z.array(
    z.object({
      value: z.string(),
      id: z.string(),
    })
  ),
});
