import { NextRequest, NextResponse } from 'next/server';

import { publicEnvs } from '@/shared/config/envs';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const responseAPI = await fetch(`${publicEnvs.NEXT_PUBLIC_API_URL}/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/game'],
};
