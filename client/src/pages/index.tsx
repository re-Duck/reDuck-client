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
        <div className=" mx-auto flex justify-between  bg-red-200 gap-4 max-w-5xl">
          <Post />
          <Advertisement />
        </div>
      </Layout>
    </>
  );
}
