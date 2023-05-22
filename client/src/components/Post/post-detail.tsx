import React from 'react';

//interface
import { IPostInformation } from '@/types';
import { parseDate } from '@/util';

interface PostDetail {
  data: IPostInformation;
}

export default function PostDetail({ data }: PostDetail) {
  return (
    <article className="flex flex-col min-w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <h1 className="text-xl font-bold mb-4">{data.postTitle}</h1>
      <p
        className="text-md text-gray-500"
        dangerouslySetInnerHTML={{ __html: data.postContent }}
      />
      <p className="text-gray-400">{parseDate(data.postCreatedAt)}</p>
      <hr />
      <p className="text-gray-400 text-sm">좋아요 0 | 조회 0</p>
    </article>
  );
}
