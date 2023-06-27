import { NextResponse, NextRequest } from 'next/server';
import { testGpt } from './providers/wordsFakeRepository';
import { inputSchema } from '../../../modules/game/validators/input';
import { getCurrentWord } from '../services/wordsService';

export async function POST(request: NextRequest) {
  const secretWord = await getCurrentWord();
  const parsedValues = inputSchema.parse((await request.json()).values);

  const secretWordArray = secretWord.value.toUpperCase().split('');

  // await delay(5000);

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

  // const testes = await testGpt(secretWord.value);

  return NextResponse.json({ results });
}
