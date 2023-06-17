import React from 'react';
import { Poppins } from 'next/font/google';
import '../shared/scss/main.scss';

const poppins = Poppins({ weight: ['300', '500', '800'], subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
