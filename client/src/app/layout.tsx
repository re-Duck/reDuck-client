import '@/styles/globals.css';
import { AuthComponent, Modal, Alert } from '@/components';
import { Noto_Sans_KR } from 'next/font/google';

// redux
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import StoreProvider from './StoreProvider';
import QueryProvider from './QueryProvider';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <head>
        <title>reDuck</title>
        <meta name="description" content="reDuck site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/main-duck.png" />
      </head>
      <body>
        <StoreProvider>
          <QueryProvider>
            <AuthComponent>
              <Modal />
              <Alert />
              {children}
            </AuthComponent>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
