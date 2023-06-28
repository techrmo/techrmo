import { NextResponse, NextRequest } from 'next/server';

import { generateWordExplanation } from '../services/openai/generateWordExplanation';
import { getCurrentWord } from '../services/words/getCurrentWord';

import { inputSchema } from '../../../modules/game/validators/input';

export async function POST(request: NextRequest) {
  const secretWord = await getCurrentWord();
  const parsedValues = inputSchema.parse((await request.json()).values);

  if (secretWord) {

  const secretWordArray = secretWord.value.toUpperCase().split('');
    
  const results = parsedValues.map((letter, index) => {
  const letterUpperCase = letter.toUpperCase();

    if (letterUpperCase === secretWordArray[index]) {
      return {
        value: letterUpperCase,
        result: 'correct',
      };
    }

    if (secretWordArray.includes(letterUpperCase)) {
      return {
        value: letterUpperCase,
        result: 'bad-position',
      };
    }

    return {
      value: letterUpperCase,
      result: 'incorrect',
    };
  });
  
  const testes = await generateWordExplanation(secretWord.value);
  
  return NextResponse.json({ results });
}
}
