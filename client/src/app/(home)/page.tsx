export const dynamic = 'force-dynamic';
//core
import { Suspense } from 'react';

//components
import { Advertisement } from '@/components';
import Loading from './loading';

//third party
import { PostsBox, WritePostButton } from './components';
import getAllPosts from '@/service/post/getAllPosts';

export default async function Home() {
  const data = await getAllPosts({});

  return (
    <>
      <div className="flex flex-col w-full gap-3 md:w-8/12">
        <WritePostButton />
        <Suspense fallback={<Loading />}>
          <PostsBox initialData={data} />
        </Suspense>
      </div>
      <Advertisement />
    </>
  );
}
