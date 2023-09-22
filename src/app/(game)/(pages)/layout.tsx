import React from 'react';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import '@/shared/scss/main.scss';

const poppins = Poppins({ weight: ['300', '500', '800'], subsets: ['latin'] });

export const metadata = {
  title: 'Techrmo',
  description: 'Advinhe a tech do dia',
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
    <ClerkProvider signInUrl="/" signUpUrl="/">
      <html lang="en">
        <head>
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
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
        </head>
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}