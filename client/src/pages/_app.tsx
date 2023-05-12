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

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <SessionProvider session={props.session}>
      <Provider store={store}>
        <AuthComponent>
          <Component {...props.pageProps} />
        </AuthComponent>
      </Provider>
    </SessionProvider>
  );
}

export default App;
