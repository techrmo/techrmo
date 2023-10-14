import { z } from 'zod';

import { userSchema } from '@/shared/schema/userSchema';

export const playerSchema = z.object({
  player: userSchema,
});
