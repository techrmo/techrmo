import { Poppins, Roboto } from 'next/font/google';

import '@/shared/scss/main.scss';

import GoogleAnalytics from '@/shared/components/GoogleAnalytics';

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

export const metadata = {
  title: 'Techrmo',
  description: 'Adivinhe a palavra do dia relacionada a tecnologia',
  appleWebApp: true,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    viewportFit: 'cover',
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
