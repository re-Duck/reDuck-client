import Image from 'next/image';
import React from 'react';

import googleLogo from '../../assets/images/google_logo.png';
import { BASE_URL } from '@/service/base/api';

export default function Comment({ data }: any) {
  return (
    <article className="flex flex-col w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <div className="flex gap-4">
        <Image
          src={`${BASE_URL}${data.commentAuthorProfileImgPath}` || googleLogo}
          alt="googleLogo"
          width="0"
          height="0"
          className="rounded-full w-8 h-8"
        />
        <span className=" font-semibold">{data.commentAuthorName}</span>
      </div>
      <p className="text-md text-gray-500">{data.commentContent}</p>
    </article>
  );
}
