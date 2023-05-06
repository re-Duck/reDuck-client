import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// packages
import 'react-quill/dist/quill.snow.css';
// redux
import { wrapper } from '@/lib/redux/store';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
