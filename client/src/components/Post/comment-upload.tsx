import { BASE_URL } from '@/service/base/api';
import Image from 'next/image';
import React from 'react';
import googleLogo from '@/assets/images/google_logo.png';
import { commentPost } from '@/service/comment-post';
import { useRouter } from 'next/router';

interface IUser {
  id: string;
  name: string;
  userProfileImgPath: string;
  token: string;
}

interface IComentUpload {
  user: IUser | undefined;
}

export default function CommentUpload({ user }: IComentUpload) {
  const router = useRouter();
  const postOriginId = router.query.id;

  const [content, setContent] = React.useState('');
  const comentImgSrc = user
    ? `${BASE_URL}${user.userProfileImgPath}`
    : googleLogo;
  const handleComment = async () => {
    if (user === undefined) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (content === '') {
      alert('댓글을 입력해주세요.');
      return;
    }
    await commentPost({ content, postOriginId, token: user.token });
    setContent('');
  };
  return (
    <div className="flex justify-between items-center gap-1 h-16 bg-white border-gray-100 border-[1px] px-10">
      <Image
        src={comentImgSrc}
        alt="img"
        width={20}
        height={20}
        className="rounded-full w-10 h-10"
      />

      <input
        className=" border-b-gray-200 border-b-[1px] p-2 pl-3 w-9/12"
        placeholder="댓글을 입력해 보세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className=" bg-red-400 rounded-lg px-3 py-2 text-white text-xs"
        onClick={handleComment}
      >
        등록
      </button>
    </div>
  );
}
