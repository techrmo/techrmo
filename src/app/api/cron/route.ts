import { NextResponse } from 'next/server';
import { getCurrentWord, getFirstWordHasNotBeenUsed, updateWordById } from '../services/words';

export async function GET() {
  const currentWord = await getCurrentWord();

  if (currentWord) {
    await updateWordById({ isCurrent: false, id: currentWord.id }, );
  }

  const newCurrentWord = await getFirstWordHasNotBeenUsed();

  if(newCurrentWord) {
    await updateWordById({ isCurrent: true, hasBeenUsed: true, id: newCurrentWord.id });
  }

  return NextResponse.json({ ok: true });
}
