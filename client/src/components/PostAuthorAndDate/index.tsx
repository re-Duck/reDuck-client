import { BASE_URL } from '@/service/base/api';
import { parseDate } from '@/util';
import Image from 'next/image';

interface PostAuthorAndDateProps {
  post: {
    postAuthorProfileImgPath: string;
    postAuthorName: string;
    postCreatedAt: string;
  };
}
export default function PostAuthorAndDate({ post }: PostAuthorAndDateProps) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full border-[1px] border-gray-scale-400 w-5 h-5 flex justify-center items-center"
          width={20}
          height={20}
          src={`${BASE_URL}${post.postAuthorProfileImgPath}`}
          alt="profile image"
        />
        <span className=" text-gray-scale-900">{post.postAuthorName}</span>
      </div>
      <span className="w-[1px] h-3 bg-gray-scale-600" />
      <span className="text-gray-scale-600">
        {parseDate(post.postCreatedAt)}
      </span>
    </div>
  );
}
