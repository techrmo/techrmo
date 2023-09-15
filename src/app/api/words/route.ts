import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import { getCurrentWord } from '../(services)/words';
import { wordValidationRequest } from '../(services)/words/validators';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session) {
    return NextResponse.json(
      {
        message: 'Usuário não autenticado',
      },
      { status: 401 }
    );
  }

  const secretWord = await getCurrentWord();
  const { values: parsedValues } = wordValidationRequest.parse(
    await request.json()
  );

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
