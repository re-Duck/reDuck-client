'use client';

import React, { useState } from 'react';

//components
import { ModifyCommentButton, DeleteButton } from '..';
import { Icon } from '@iconify/react';

//service
import { BASE_URL } from '@/service/base/api';

//types
import { IComment } from '@/types';
import Link from 'next/link';
import Avatar from '../../Avatar';
import { parseDate } from '@/util';
import { HeartIcon } from '@/assets/Icon';

interface ICommentProps {
  data: IComment;
  IS_AUTHOR: boolean;
  postOriginId: string;
}
export default function Comment({
  data,
  IS_AUTHOR,
  postOriginId,
}: ICommentProps) {
  const [isModifying, setIsModifying] = useState(false);
  const [comment, setComment] = useState(data.commentContent);
  return (
    <article className="py-6 border-b border-blue-gray-scale-50">
      <div className="flex justify-between">
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
              {parseDate(data.commentCreatedAt)}
            </span>
          </div>
        </Link>

        {/* {IS_AUTHOR && (
          <div className="flex gap-2">
            <ModifyCommentButton
              id={data.commentOriginId}
              comment={comment}
              postOriginId={postOriginId}
              isModifying={isModifying}
              setIsModifying={setIsModifying}
            />
            {isModifying && (
              <button
                onClick={() => setIsModifying(false)}
                className="font-medium text-gray-400"
              >
                취소
              </button>
            )}
            <DeleteButton
              id={data.commentOriginId}
              type="comment"
              postOriginId={postOriginId}
            />
          </div>
        )} */}
      </div>
      {/* {isModifying ? (
        <input
          className="p-1 pl-4 text-gray-500 border-2 border-gray-200 rounded-md text-md focus:outline-none focus:border-gray-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      ) : (
        <p className="text-gray-500 text-md">{comment}</p>
      )} */}
      <div className="relative px-10 py-[18px]">
        <div className="absolute top-0 right-4 flex flex-col items-center gap-0.5">
          <HeartIcon width={20} height={20} />
          <span className="text-xs text-gray-scale-500">5</span>
        </div>
        <span className="text-sm">{comment}</span>
      </div>
      <div className="px-10">
        <div className="px-2 py-1 flex gap-1.5">
          <Icon
            icon="mingcute:pencil-line"
            width={16}
            height={16}
            className="text-gray-scale-900"
          />
          <span className="text-xs text-gray-scale-900">답글 달기</span>
        </div>
      </div>
    </article>
  );
}
