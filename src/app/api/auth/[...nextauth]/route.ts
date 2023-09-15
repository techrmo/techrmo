import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { privateEnvs } from '@/shared/config/envs';

import { upsertPlayer } from '../../(services)/players';

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
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
