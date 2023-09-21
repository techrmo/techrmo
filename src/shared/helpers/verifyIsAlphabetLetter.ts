import { AlphabetLetter } from '../schema/alphabetLetterSchema';

export const verifyIsAlphabetLetter = (
  character: string
): character is AlphabetLetter => /^[a-zA-Z]$/.test(character);
