import { NextRequest, NextResponse } from 'next/server';

import { publicEnvs } from '@/shared/config/envs';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  const responseAPI = await fetch(`${publicEnvs.NEXT_PUBLIC_API_URL}/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseAPI.status !== 200) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.rewrite(new URL('/game', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|.*.png|.*.svg|browserconfig.xml|auth|__/auth).*)',
  ],
};
