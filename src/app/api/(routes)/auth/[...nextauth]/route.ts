/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { cookies } from 'next/headers';

import { privateEnvs } from '@/shared/config/envs';
import { getCurrentAttemptPlayer } from '@/app/api/(services)/attempts';

import { upsertPlayer } from '../../../(services)/players';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: privateEnvs.GITHUB_ID,
      clientSecret: privateEnvs.GITHUB_SECRET,
    }),
  ],
  secret: privateEnvs.NEXTAUTH_SECRET,
  callbacks: {
    signIn: (params) => upsertPlayer(params.user),
    session: async (params) => {
      if (!params.session.user?.email) {
        throw new Error('Usuario não autenticado');
      }

      const attempt = await getCurrentAttemptPlayer(params.session.user.email);

      // @ts-ignore
      cookies().set('current-attempt', JSON.stringify(attempt?.values));

      return params.session;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
