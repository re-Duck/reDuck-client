import Link from 'next/link';
import React from 'react';

//Interface
import { IPostInformation } from '@/types';
import Avatar from '../../Avatar';
import { BASE_URL } from '@/service/base/api';
import { parseDate } from '@/util';

export function PostSummary({
  postInfoData,
}: {
  postInfoData: IPostInformation;
}) {
  const url = postInfoData.postAuthorId
    ? `${BASE_URL}${postInfoData.postAuthorProfileImgPath}`
    : '';

  return (
    <article className="flex flex-col w-full gap-3 p-6 bg-white border-2 border-gray-100 rounded-l h-50">
      <div className="flex">
        <Link
          href={`profile/${postInfoData.postAuthorId}`}
          className="flex items-center gap-2 mb-4 font-semibold hover:cursor-pointer"
        >
          <Avatar src={url} alt="user_icon" size="sm" />
          <div className="flex flex-col">
            <span className="text-md">{postInfoData.postAuthorName}</span>
            <span className="text-xs text-gray-400">{`${postInfoData.postAuthorDevelopAnnual}년차 개발자 `}</span>
          </div>
        </Link>
      </div>

      <Link
        href={`/board/${postInfoData.postOriginId}`}
        className="hover:cursor-pointer"
        onClick={() => {
          sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        }}
      >
        <h1 className="mb-3 text-2xl font-bold">{postInfoData.postTitle}</h1>

        <p
          className="mb-3 text-gray-500 text-md line-clamp-3"
          dangerouslySetInnerHTML={{ __html: postInfoData.postContent }}
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">{`좋아요 ${postInfoData.likes} | 조회 ${postInfoData.hits}`}</p>
            <p className="text-gray-400">
              {parseDate(postInfoData?.postCreatedAt)}
            </p>
          </div>
          <p className="text-sm text-gray-400">{`댓글 ${postInfoData.commentsCount}`}</p>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(PostSummary);
