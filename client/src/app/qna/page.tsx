import TagNavigation from './components/TagNavigation';
import PostSection from './components/PostsSection';
import getAllPosts from '@/service/post/getAllPosts';

export default async function Qna() {
  const data = await getAllPosts({ postType: 'qna', pageParam: '' });

  return (
    <div className="flex flex-col w-full gap-[42px] max-w-[850px]">
      <TagNavigation />
      <PostSection initialData={data} />
    </div>
  );
}
