import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { privateEnvs } from '@/shared/config/envs';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: privateEnvs.GITHUB_ID,
      clientSecret: privateEnvs.GITHUB_SECRET,
    }),
  ],
  secret: privateEnvs.NEXTAUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
