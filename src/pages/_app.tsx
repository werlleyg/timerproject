import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  );
}
