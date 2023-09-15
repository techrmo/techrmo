import { NextRequest, NextResponse } from 'next/server';

import { privateEnvs } from '@/shared/config/envs';

import {
  getCurrentWord,
  getFirstWordHasNotBeenUsed,
  updateWordById,
} from '../(services)/words';

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const token = requestHeaders.get('authorization')?.split(' ')[1];

  if (privateEnvs.TOKEN_API !== token) {
    return NextResponse.json(
      {
        message: 'Unathorized',
      },
      { status: 401 }
    );
  }

  const currentWord = await getCurrentWord();

  if (currentWord) {
    await updateWordById(currentWord.id, { isCurrent: false });
  }

  const newCurrentWord = await getFirstWordHasNotBeenUsed();

  if (newCurrentWord) {
    await updateWordById(newCurrentWord.id, {
      isCurrent: true,
      hasBeenUsed: true,
    });
  }

  return NextResponse.json({ ok: true });
}
