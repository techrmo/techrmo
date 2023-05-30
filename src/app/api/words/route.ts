import { NextResponse } from 'next/server';

export function POST(req, res) {
  const word = 'Oloquinho meu';

  return NextResponse.json({ ok: true });
}

export function GET(req, res) {
  console.log('opa');

  return NextResponse.json({ ok: true });
}
