import { z } from 'zod';

type UpperCaseCharacter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
type Character = UpperCaseCharacter | Lowercase<UpperCaseCharacter> | '';

const stringValidation = z
  .string()
  .length(1)
  .transform((string) => string.toLocaleUpperCase());

export const inputSchema = z.object({
  value: z.array(stringValidation).length(5),
});

export type FormFields = z.infer<typeof inputSchema>
