import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Advertisement from '@/components/Advertisement';
import Post from '@/components/Post';

export default function Home() {
  return (
    <>
      <Head>
        <title>reDuck</title>
        <meta name="description" content="reDuck site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className=" mx-auto flex justify-betwee gap-4 max-w-5xl">
          <div className="flex flex-col w-full md:w-8/12 border-gray-100 border-2 gap-3">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <Advertisement />
        </div>
      </Layout>
    </>
  );
}
