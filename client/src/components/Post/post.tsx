import Link from 'next/link';
import React from 'react';

//Interface
import { IPostInformation } from '@/types';

export function Post(props: IPostInformation) {
  return (
    <Link href={`/board/${props.postOriginId}`}>
      <article className="flex flex-col w-full  bg-white border-gray-100 border-2 h-50 p-6 hover:cursor-pointer rounded-lg">
        <h1 className="text-xl font-bold mb-4">{props.postTitle}</h1>
        <p
          className="text-md text-gray-500 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: props.postContent }}
        />
      </article>
    </Link>
  );
}

export default React.memo(Post);
