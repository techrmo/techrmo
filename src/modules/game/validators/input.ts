import { z } from 'zod';

const stringValidation = z
  .string()
  .length(1)
  .transform((string) => string.toLocaleUpperCase());

export const inputSchema = z.object({
  value: z.tuple([
    stringValidation,
    stringValidation,
    stringValidation,
    stringValidation,
    stringValidation,
  ]),
});

export type FormFields = z.infer<typeof inputSchema>
