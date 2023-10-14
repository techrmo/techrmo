import { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';

import '@/shared/scss/main.scss';
import GoogleAnalytics from '@/shared/components/core/GoogleAnalytics';
import { ToastProvider } from '@/shared/components/core/ToastProvider';
import { UserProvider } from '@/shared/components/core/UserProvider';

const poppins = Poppins({
  weight: ['300', '500', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
const roboto = Roboto({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Techrmo',
  description: 'Todos os dias uma nova palavra para você jogar e aprender.',
  appleWebApp: true,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    viewportFit: 'cover',
    userScalable: false,
  },
  openGraph: {
    siteName: 'Techrmo',
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://www.techrmo.app" rel="canonical" />

        <meta httpEquiv="content-language" content="pt-br" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#64b447" />

        <meta name="msapplication-TileColor" content="#000000" />
        <GoogleAnalytics />
      </head>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <UserProvider>
          <ToastProvider>{children}</ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
