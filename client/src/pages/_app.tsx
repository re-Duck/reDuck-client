import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// packages
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';

// redux
import store from '@/lib/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
