import { z } from 'zod';

export const wordSizeSchema = z.object({
  size: z.number(),
});
