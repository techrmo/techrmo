import { NextResponse, NextRequest } from 'next/server';

import { getCurrentWord } from '../_services/words/getCurrentWord';
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

    return NextResponse.json({ results });
  }
}
