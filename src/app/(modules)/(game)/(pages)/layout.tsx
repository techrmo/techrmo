import '@/shared/scss/main.scss';

import { UserProvider } from '@/shared/components/core/UserProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
