//core
import React, { Suspense } from 'react';

//components
import { Advertisement } from '@/components';

//third party
import { Loading, PostsBox, WritePostButton } from './components';

export default function Home() {
  return (
    <div className="flex justify-between max-w-5xl mx-auto">
      <div className="flex flex-col w-full gap-3 md:w-8/12">
        <WritePostButton />
        <Suspense fallback={<Loading />}>
          <PostsBox />
        </Suspense>
      </div>
      <Advertisement />
    </div>
  );
}
