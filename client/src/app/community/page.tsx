'use client';

import getAllPosts from '@/service/post/getAllPosts';
import PostsSection from './components/PostsSection';

export default async function Home() {
  const data = await getAllPosts({ postType: 'qna', pageParam: '' });
  return (
    <div className="flex flex-col w-full gap-[42px] max-w-[850px]">
      <PostsSection initialData={data} />
    </div>
  );
}
