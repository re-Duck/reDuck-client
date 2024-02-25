import { HeartOn } from '@/assets/Icon';
import PostAuthorAndDate from '@/components/PostAuthorAndDate';
import { IPostInformation } from '@/types';

interface PostProps {
  post: IPostInformation;
}

export default function Post({ post }: PostProps) {
  return (
    <article className="w-full flex flex-col gap-4 px-4 py-[26px] border-b border-gray-scale-400 cursor-pointer hover:shadow-md">
      <div className="flex justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="text-[18px] font-bold">{post.postTitle}</h2>
          <div className="h-7">
            <PostAuthorAndDate post={post} />
          </div>
          <div className="h-[42px] line-clamp-2 text-[14px] text-gray-scale-700 pr-[42px]">
            {post.postContent}
          </div>
        </div>

        <div className="w-[104px] h-[104px] bg-gray-scale-300"></div>
      </div>
      <div className="text-[12px] text-gray-scale-600 flex justify-between">
        <span>{`${post.commentsCount}개의 댓글`}</span>
        <span className="flex items-center gap-1">
          <HeartOn width={16} height={16} fill="#A1A1A1" stroke="#A1A1A1" />
          {post.likes}
        </span>
      </div>
    </article>
  );
}
