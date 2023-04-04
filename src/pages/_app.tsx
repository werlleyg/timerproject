import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

import { Roboto } from 'next/font/google';
const roboto = Roboto({
  weight: ['300', '400', '100', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
