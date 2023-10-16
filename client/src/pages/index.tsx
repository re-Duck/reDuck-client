//core
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
//components
import { Advertisement, Layout } from '@/components';
import { Loading, WritePostButton } from '@/components/home';
import ErrorFallback from '@/components/common/ErrorFallback';
//third party
import { ErrorBoundary } from 'react-error-boundary';

const PostsBox = dynamic(() => import('@/components/home/PostsBox'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Layout>
        <div className="flex justify-between max-w-5xl mx-auto">
          <div className="flex flex-col w-full gap-3 md:w-8/12">
            <WritePostButton />

            <ErrorBoundary FallbackComponent={ErrorFallback}>
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
