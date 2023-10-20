import { z } from 'zod';

export const userSchema = z.object({
  uid: z.string(),
  name: z.string(),
  email: z.string(),
  profileImage: z.string(),
});
