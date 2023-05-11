import { Poppins } from 'next/font/google';
import type { AppProps } from 'next/app';
import '../shared/scss/main.scss';

const poppins = Poppins({ weight: ['300', '500', '800'], subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={poppins.className} {...pageProps} />;
}
