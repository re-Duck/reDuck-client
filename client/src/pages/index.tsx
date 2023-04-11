import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

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
          <div className="bg-blue-5 w-8/12 bg-blue-200 h-60">
            <div>게시판</div>
          </div>
          <div className="bg-blue-5  w-3/12 bg-blue-200 h-60">
            <div>광고</div>
          </div>
        </div>

        {/* <div className="bg-gray-50 h-screen mt-14 p-4"></div> */}
      </Layout>
    </>
  );
}
