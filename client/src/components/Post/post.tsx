import Link from 'next/link';
import React from 'react';

//Interface
import { IPostInformation } from '@/types';
import Avatar from '../Avatar';
import { BASE_URL } from '@/service/base/api';
import { parseDate } from '@/util';

export function Post(props: IPostInformation) {
  const url = props.postAuthorId
    ? `${BASE_URL}${props.postAuthorProfileImgPath}`
    : '';
  return (
    <Link href={`/board/${props.postOriginId}`}>
      <article className="flex flex-col w-full  bg-white border-gray-100 border-2 h-50 p-6 hover:cursor-pointer rounded-l gap-3">
        <h1 className="text-xl font-bold">{props.postTitle}</h1>
        <div className="flex gap-2 font-semibold items-center">
          <Avatar src={url} alt="user_icon" size="xs" />
          <p>{props.postAuthorName}</p>
        </div>
        <p
          className="text-md text-gray-500 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: props.postContent }}
        />
        <div className="flex flex-col gap-1">
          <p className="text-gray-400 text-sm">좋아요 0 | 조회 0</p>
          <p className="text-gray-400">{parseDate(props?.postCreatedAt)}</p>
        </div>
      </article>
    </Link>
  );
}

export default React.memo(Post);
