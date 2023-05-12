import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthComponent } from '@/components';

// packages
import 'react-quill/dist/quill.snow.css';
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
  const [queryClient] = React.useState(() => new QueryClient());
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <SessionProvider session={props.session}>
      <Provider store={store}> 
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthComponent>
              <Component {...pageProps} />
            </AuthComponent>
          </Hydrate>
        </QueryClientProvider>
       </Provider>
    </SessionProvider>
  );
}

export default App;
