import { z } from 'zod';

const stringValidation = z
  .string()
  .length(1)
  .transform((string) => string.toLocaleUpperCase());

export const inputSchema = z.object({
  value: z.array(stringValidation).length(5),
});

export type FormFields = z.infer<typeof inputSchema>
