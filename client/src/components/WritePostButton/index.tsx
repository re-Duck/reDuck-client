import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import user_icon from '@/assets/images/user_icon.png';
import { useSession } from 'next-auth/react';
import { BASE_URL } from '@/service/base/api';

export function WritePostButton() {
  const { data } = useSession();
  const imgPath = data
    ? `${BASE_URL}${data.user.userProfileImgPath}`
    : user_icon;

  return (
    <article className="flex justify-between w-full items-center bg-white border-gray-100 border-[1px] h-25 p-6 ">
      <Image
        src={imgPath}
        alt="user_icon"
        width="0"
        height="0"
        className="rounded-full w-10 h-10"
      />
      <button className=" border-[1px] rounded-md w-11/12 bg-gray-50 h-12">
        {data?.user.token ? (
          <Link href={'/write'}>
            <p className=" text-gray-400">나누고 싶은 생각이 있으신가요?</p>
          </Link>
        ) : (
          <p
            className=" text-gray-400"
            onClick={() => alert('로그인 후 게시글을 작성해 주세요')}
          >
            로그인 후 게시글을 작성해 주세요
          </p>
        )}
      </button>
    </article>
  );
}

export default React.memo(WritePostButton);
