import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Navigator from '@/components/Navigator';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="m-auto">
        <Navigator />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
