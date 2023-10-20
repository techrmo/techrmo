import { z } from 'zod';

export const createSessionSchema = z.object({
  githubId: z.string(),
});
