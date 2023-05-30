import { NextResponse, NextRequest } from 'next/server';
import { getTodayWord } from './providers/wordsFakeRepository';
import { inputSchema } from '../../../modules/game/validators/input';

export async function POST(request: NextRequest) {
  const secretWord = getTodayWord();
  const { value } = inputSchema.parse(await request.json());

  const secretWordArray = secretWord.toLocaleUpperCase().split('');

  const results = value.map((letter, index) => {
    if (letter === secretWordArray[index]) {
      return {
        value: letter,
        result: 'correct',
      };
    }

    if (secretWordArray.includes(letter)) {
      return {
        value: letter,
        result: 'bad-position',
      };
    }

    return {
      value: letter,
      result: 'incorrect',
    };
  });

  return NextResponse.json({ results });
}
