import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWord, getFirstWordHasNotBeenUsed, updateWordById } from '../_services/words';
import { parsedEnvs } from '../_config/parseEnvs';

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const token = requestHeaders.get('authorization')?.split(' ')[1];

  if (parsedEnvs.TOKEN_API !== token) {
    return NextResponse.json({
      message: 'Unathorized',
    }, { status: 401 });
  }

  const currentWord = await getCurrentWord();

  if (currentWord) {
    await updateWordById({ isCurrent: false, id: currentWord.id });
  }

  const newCurrentWord = await getFirstWordHasNotBeenUsed();

  if (newCurrentWord) {
    await updateWordById({ isCurrent: true, hasBeenUsed: true, id: newCurrentWord.id });
  }

  return NextResponse.json({ ok: true });
}
