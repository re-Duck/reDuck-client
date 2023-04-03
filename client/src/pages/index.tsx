import React from 'react';
import Head from 'next/head';
export default function Home() {
  return (
    <>
      <Head>
        <title>reDuck</title>
        <meta name="description" content="reDuck site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav className="w-full h-14 border-b-2 border-gray-100">
          <ol className="m-auto p-8 max-w-6xl flex justify-between items-center h-full">
            <div>reDcuk</div>
            <div>목록</div>
            <div>프로필</div>
          </ol>
        </nav>
      </main>
    </>
  );
}
