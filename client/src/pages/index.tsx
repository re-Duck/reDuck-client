import React, { Suspense } from 'react';
// import { useSelector } from 'react-redux';

//components
import { Advertisement, Layout } from '@/components';
import { WritePostButton } from '@/components';
import { Loading } from '@/components/home';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import dynamic from 'next/dynamic';
import ErrorFallback from '@/components/common/ErrorFallback';

const PostsBox = dynamic(() => import('@/components/home/PostsBox'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Layout>
        <div className="flex justify-between max-w-5xl mx-auto ">
          <div className="flex flex-col w-full gap-3 md:w-8/12">
            <WritePostButton />

            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense fallback={<Loading />}>
                <PostsBox />
              </Suspense>
            </ErrorBoundary>
          </div>
          <Advertisement />
        </div>
      </Layout>
    </>
  );
}
