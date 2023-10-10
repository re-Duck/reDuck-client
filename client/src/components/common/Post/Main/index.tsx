import Link from 'next/link';
import React from 'react';

//Interface
import { IPostInformation } from '@/types';
import Avatar from '../../Avatar';
import { BASE_URL } from '@/service/base/api';
import { parseDate } from '@/util';

export function Main(props: IPostInformation) {
  const url = props.postAuthorId
    ? `${BASE_URL}${props.postAuthorProfileImgPath}`
    : '';

  return (
    <article className="flex flex-col w-full gap-3 p-6 bg-white border-2 border-gray-100 rounded-l h-50">
      <div className="flex">
        <Link
          href={`profile/${props.postAuthorId}`}
          className="flex items-center gap-2 mb-4 font-semibold hover:cursor-pointer"
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
        onClick={() => {
          sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        }}
      >
        <h1 className="text-xl font-bold">{props.postTitle}</h1>

        <p
          className="mb-3 text-gray-500 text-md line-clamp-3"
          dangerouslySetInnerHTML={{ __html: props.postContent }}
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">좋아요 0 | 조회 0</p>
            <p className="text-gray-400">{parseDate(props?.postCreatedAt)}</p>
          </div>
          <p className="text-sm text-gray-400">{`댓글 ${props.commentsCount}`}</p>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(Main);
