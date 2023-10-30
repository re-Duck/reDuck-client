import React, { useState } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthComponent, Modal } from '@/components';

// packages
import { SessionProvider } from 'next-auth/react';

// redux
import { Provider } from 'react-redux';
import { wrapper } from '@/lib/redux/store';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>reDuck</title>
        <meta name="description" content="reDuck site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/main-duck.png" />
      </Head>
      <SessionProvider session={props.session}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={props.dehydratedState}>
              <AuthComponent>
                <Modal />
                <Component {...props} />
              </AuthComponent>
            </Hydrate>
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default App;
