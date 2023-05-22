import React, { useState } from 'react';

//next
import { useRouter } from 'next/router';
import Image from 'next/image';

//service
import { BASE_URL } from '@/service/base/api';
import { commentPost } from '@/service/comment-post';

//assets
import googleLogo from '@/assets/images/google_logo.png';
import { errorMessage, successMessage } from '@/constant';

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

  const [content, setContent] = useState('');
  const comentImgSrc = user
    ? `${BASE_URL}${user.userProfileImgPath}`
    : googleLogo;
  const handleComment = async () => {
    if (user === undefined) {
      alert(errorMessage.needLogin);
      return;
    }
    if (content === '') {
      alert(errorMessage.blankComment);
      return;
    }
    await commentPost({ content, postOriginId, token: user.token });
    alert(successMessage.commentSuccess);
  };
  return (
    <form className="flex justify-between items-center gap-1 h-16 bg-white border-gray-100 border-[1px] px-10">
      <Image
        src={comentImgSrc}
        alt="img"
        width={30}
        height={30}
        className="rounded-full"
      />

      <input
        className=" border-b-gray-200 border-b-[1px] p-2 pl-3 w-9/12"
        placeholder="댓글을 입력해 보세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className=" bg-red-400 rounded-lg px-3 py-2 text-white text-xs"
        type="submit"
        onClick={handleComment}
      >
        등록
      </button>
    </form>
  );
}
