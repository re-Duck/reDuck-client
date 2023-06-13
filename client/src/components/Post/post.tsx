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
  console.log(props);
  return (
    <article className="flex flex-col w-full  bg-white border-gray-100 border-2 h-50 p-6  rounded-l gap-3">
      <div className="flex">
        <Link
          href={`profile/${props.postAuthorId}`}
          className="flex gap-2 font-semibold items-center mb-4 hover:cursor-pointer"
        >
          <Avatar src={url} alt="user_icon" size="sm" />
          <div className="flex flex-col">
            <span className="text-md">{props.postAuthorName}</span>
            <span className="text-xs text-gray-400">{`${props.postAuthorDevelopAnnual}년차 개발자 `}</span>
          </div>
        </Link>
      </div>

      <Link
        href={`/board/${props.postOriginId}`}
        className="hover:cursor-pointer"
      >
        <h1 className="text-xl font-bold">{props.postTitle}</h1>

        <p
          className="text-md text-gray-500 line-clamp-3 mb-3"
          dangerouslySetInnerHTML={{ __html: props.postContent }}
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-sm">좋아요 0 | 조회 0</p>
            <p className="text-gray-400">{parseDate(props?.postCreatedAt)}</p>
          </div>
          <p className="text-gray-400 text-sm">{`댓글 ${props.commentsCount}`}</p>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(Post);
