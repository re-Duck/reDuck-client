import React, { useEffect } from 'react';

//interface
import { IPostInformation } from '@/types';
import { parseDate } from '@/util';

interface PostDetail {
  data: IPostInformation;
}

export default function PostDetail({ data }: PostDetail) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = data.postContent;
    }
  });
  console.log(data);
  return (
    <article className="flex flex-col max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <h1 className="text-xl font-bold mb-4">{data.postTitle}</h1>
      <p className="text-md text-gray-500" ref={contentRef}></p>
      <p className="text-gray-400">{parseDate(data.postCreatedAt)}</p>
      <hr />
      <p className="text-gray-400 text-sm">좋아요 261 | 조회 7,042</p>
    </article>
  );
}
