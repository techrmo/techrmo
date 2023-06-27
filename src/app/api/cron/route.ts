import { NextResponse } from 'next/server';
import { getCurrentWord, getFirstWordHasNotBeenUsed, updateWordById } from '../services/wordsService';

export async function GET() {
  const currentWord = await getCurrentWord();

  if (currentWord) {
    await updateWordById({ isCurrent: false }, currentWord.id);
  }

  const newCurrentWord = await getFirstWordHasNotBeenUsed();
  await updateWordById({ isCurrent: true, hasBeenUsed: true }, newCurrentWord.id);

  return NextResponse.json({ ok: true });
}
