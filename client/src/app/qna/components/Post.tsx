import { Check } from '@/assets/Icon';
import { BASE_URL } from '@/service/base/api';
import { IPostInformation } from '@/types';
import { parseDate } from '@/util';
import Image from 'next/image';

interface PostProps {
  post: IPostInformation;
}
export default function Post({ post }: PostProps) {
  return (
    <article className=" px-4 py-[26px] border-b border-gray-scale-400 w-full hover:shadow-md duration-300 cursor-pointer">
      <section className="w-full h-[140px] flex">
        <div className="w-[132px] h-full flex flex-col justify-center pr-6 items-end border-r-[1px] border-blue-gray-scale-50 gap-[17px]">
          <div className="flex items-center gap-2">
            <Check stroke="#1F9854" strokeWidth="3" />
            <span className="text-blue-gray-scale-400 text-[14px] font-medium flex items-center gap-2">
              <strong className="text-[24px] ">{post.commentsCount}</strong>
              답변
            </span>
          </div>

          <span className="text-blue-gray-scale-200 text-[14px] flex items-center gap-2">
            <strong className="text-[24px] font-normal">{post.hits}</strong>{' '}
            조회
          </span>
        </div>

        <div className="flex flex-col w-full h-full gap-2 px-6 overflow-hidden">
          <h3 className="text-[18px] font-medium">{post.postTitle}</h3>
          <p className="text-ellipsis line-clamp-2 text-gray-scale-700">
            {post.postContent}
          </p>

          <div>
            <div className="flex w-full gap-1 h-[24px]">
              <span className="flex justify-center items-center py-1 px-2 border-[1px] border-gray-scale-500 text-gray-scale-700 text-[12px] rounded-[2px]">
                #tag
              </span>
            </div>
            <div className="flex justify-end text-[12px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full border-[1px] border-gray-scale-400 w-5 h-5 flex justify-center items-center"
                    width={20}
                    height={20}
                    src={`${BASE_URL}${post.postAuthorProfileImgPath}`}
                    alt="profile image"
                  />
                  <span className=" text-gray-scale-900">
                    {post.postAuthorName}
                  </span>
                </div>
                <span className="w-[1px] h-3 bg-gray-scale-600" />
                <span className="text-gray-scale-600">
                  {parseDate(post.postCreatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
