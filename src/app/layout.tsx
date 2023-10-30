import { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';

import '@/shared/scss/main.scss';
import GoogleAnalytics from '@/shared/components/core/GoogleAnalytics';
import { ToastProvider } from '@/shared/components/core/ToastProvider';
import { generateSchema } from '@/shared/services/generateSchema';

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
  title: 'Techrmo | Um termo técnico por dia',
  description:
    'Explore um novo termo técnico a cada dia para aprimorar suas habilidades e conhecimento. Desperte a sua curiosidade com nossa coleção de termos técnicos diários, perfeita para jogadores e entusiastas em constante busca por aprendizado.',
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
    title: 'Techrmo | Um termo técnico por dia',
    description:
      'Explore um novo termo técnico a cada dia para aprimorar suas habilidades e conhecimento. Desperte a sua curiosidade com nossa coleção de termos técnicos diários, perfeita para jogadores e entusiastas em constante busca por aprendizado.',
    siteName: 'Techrmo',
    url: 'https://techrmo.app',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/techrmo/opengraph.jpg',
        alt: 'Techrmo | Um novo termo técnico por dia',
      },
    ],
  },
  twitter: {
    title: 'Techrmo | Um termo técnico por dia',
    description:
      'Explore um novo termo técnico a cada dia para aprimorar suas habilidades e conhecimento. Desperte a sua curiosidade com nossa coleção de termos técnicos diários, perfeita para jogadores e entusiastas em constante busca por aprendizado.',
    site: 'Techrmo',
    images: [
      {
        url: 'https://storage.googleapis.com/techrmo/opengraph.jpg',
        alt: 'Techrmo | Um termo técnico por dia',
      },
    ],
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = generateSchema();

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <GoogleAnalytics />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
