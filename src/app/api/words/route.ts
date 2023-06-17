import { NextResponse, NextRequest } from 'next/server';
import { getTodayWord } from './providers/wordsFakeRepository';
import { inputSchema } from '../../../modules/game/validators/input';

export async function POST(request: NextRequest) {
  const secretWord = getTodayWord();
  const parsedValues = inputSchema.parse((await request.json()).values);

  const secretWordArray = secretWord.toUpperCase().split('');

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
