import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import 'react-quill/dist/quill.snow.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
