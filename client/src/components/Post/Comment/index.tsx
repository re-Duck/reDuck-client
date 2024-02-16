'use client';

import React, { useState } from 'react';

//components
import { Icon } from '@iconify/react';
import { ArrowDownIcon } from '@/assets/Icon';

//service
import { BASE_URL } from '@/service/base/api';

//types
import { IComment } from '@/types';
import Link from 'next/link';
import Avatar from '../../Avatar';
import { parseDateWithDot } from '@/util';
import { HeartIcon } from '@/assets/Icon';

interface ICommentProps {
  data: IComment;
  IS_AUTHOR: boolean;
  postOriginId: string;
  children?: React.ReactNode;
}
export default function Comment({
  data,
  IS_AUTHOR,
  postOriginId,
  children,
}: ICommentProps) {
  const [isModifying, setIsModifying] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [comment, setComment] = useState(data.commentContent);

  const childCount = React.Children.count(children);

  return (
    <article className="py-6 border-b border-blue-gray-scale-50">
      <div className="relative flex justify-between">
        <Link
          className="flex items-center gap-2"
          href={`/profile/${data.commentAuthorId}`}
        >
          <Avatar
            src={`${BASE_URL}${data.commentAuthorProfileImgPath}`}
            alt="user_icon"
            size="xss"
          />
          <div className="flex flex-col">
            <span className="text-sm ">{data.commentAuthorName}</span>
            <span className="text-xs text-gray-scale-600">
              {parseDateWithDot(data.commentCreatedAt)}
            </span>
          </div>
        </Link>
        {IS_AUTHOR && (
          <div className="absolute right-0 flex items-center gap-2 text-xs top-1/4 text-gray-scale-900">
            <span className="hover:underline hover:cursor-pointer">수정</span>
            <span className="hover:underline hover:cursor-pointer">삭제</span>
          </div>
        )}
      </div>
      {isModifying ? (
        <input
          className="p-1 pl-4 text-gray-500 border-2 border-gray-200 rounded-md text-md focus:outline-none focus:border-gray-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      ) : (
        <div className="relative px-10 py-[18px]">
          <div className="absolute top-1/4 right-4 flex flex-col items-center gap-0.5">
            <HeartIcon width={20} height={20} />
            <span className="text-xs text-gray-scale-500">5</span>
          </div>
          <span className="text-sm">{comment}</span>
        </div>
      )}

      {data.commentParentId === 'root' && (
        <div className="pl-12 ">
          {childCount > 0 ? (
            isReplyOpen ? (
              <div
                className="w-fit py-1 flex gap-1.5 items-center hover:cursor-pointer"
                onClick={() => setIsReplyOpen(false)}
              >
                <ArrowDownIcon
                  transform="rotate(180)"
                  width={16}
                  height={16}
                  className="text-gary-scale-900"
                />
                <span className="text-xs text-gray-scale-900">답글 숨기기</span>
              </div>
            ) : (
              <div
                className="w-fit py-1 flex gap-1.5 items-center hover:cursor-pointer"
                onClick={() => setIsReplyOpen(true)}
              >
                <ArrowDownIcon
                  width={16}
                  height={16}
                  className="text-gary-scale-900"
                />
                <span className="text-xs text-gray-scale-900">
                  답글 {childCount}개 보기
                </span>
              </div>
            )
          ) : (
            <div className="w-fit py-1 flex gap-1.5 items-center hover:cursor-pointer">
              <Icon
                icon="mingcute:pencil-line"
                width={16}
                height={16}
                className="text-gray-scale-900"
              />
              <span className="text-xs text-gray-scale-900">답글 달기</span>
            </div>
          )}
          {isReplyOpen && (
            <>
              <div className="border-t border-blue-gray-scale-50 mt-[18px]">
                {children}
              </div>
              <div className="mt-3 py-1 flex items-center justify-center gap-1.5 hover:cursor-pointer border border-blue-gray-scale-200">
                <Icon
                  icon="mingcute:pencil-line"
                  width={16}
                  height={16}
                  className="text-gray-scale-900"
                />
                <span className="text-xs text-gray-scale-900">답글 달기</span>
              </div>
            </>
          )}
        </div>
      )}
    </article>
  );
}
