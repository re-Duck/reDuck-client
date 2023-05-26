import React, { useEffect, useState } from 'react';

//interface
import { IPostInformation } from '@/types';
import { parseDate } from '@/util';
import Image from 'next/image';
import { BASE_URL } from '@/service/base/api';
import googleLogo from '@/assets/images/google_logo.png';

interface PostDetail {
  data: IPostInformation;
}

export default function PostDetail({ data }: PostDetail) {
  const [html, setHTML] = useState<string>('');

  useEffect(() => {
    setHTML(data?.postContent);
  }, []);
  console.log(data);
  const url = data ? `${BASE_URL}${data.postAuthorProfileImgPath}` : googleLogo;

  return (
    <article className="flex flex-col min-w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <h1 className="text-xl font-bold">{data.postTitle}</h1>
      <h2 className="text-md font-semibold mb-2">
        <div className="flex gap-2">
          <Image
            src={url}
            alt="googleLogo"
            width="0"
            height="0"
            className="rounded-full w-6 h-6"
          />
          <p>{data.postAuthorName}</p>
        </div>
      </h2>
      <p
        className="text-md text-gray-500"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <p className="text-gray-400">{parseDate(data?.postCreatedAt)}</p>
      <hr />
      <p className="text-gray-400 text-sm">좋아요 0 | 조회 0</p>
    </article>
  );
}
