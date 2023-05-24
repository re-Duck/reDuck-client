import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthComponent, Modal } from '@/components';

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
  const { store, props } = wrapper.useWrappedStore(rest);
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider session={props.session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={props.dehydratedState}>
            <AuthComponent>
              {/* <div>1234</div> */}
              <Component {...props} />
            </AuthComponent>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}

export default App;
