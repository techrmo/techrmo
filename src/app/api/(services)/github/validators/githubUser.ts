import { z } from 'zod';

export const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
});
