import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
          <ul className="m-auto p-8 max-w-6xl flex justify-between items-center h-full">
            <li>
              <Link href="/" className="text-2xl font-bold">
                reDcuk
              </Link>
            </li>

            <li className="flex-auto pl-8">
              <ul className=" flex gap-8 text-gray-500">
                <li>
                  <Link href="/board">게시판</Link>
                </li>
                <li>
                  <Link href="/qna">Q&A</Link>
                </li>
                <li>
                  <Link href="/chatroom">채팅방</Link>
                </li>
              </ul>
            </li>

            <li className="w-32 font-bold">
              <ul>
                <li>
                  <Link href="/login">로그인</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
