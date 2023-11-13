import React, { useState } from 'react';

//components
import { ModifyCommentButton, DeleteButton } from '..';

//service
import { BASE_URL } from '@/service/base/api';

//types
import { IComment } from '@/types';
import Link from 'next/link';
import Avatar from '../../Avatar';
import { parseDate } from '@/util';

interface ICommentProps {
  data: IComment;
  IS_AUTHOR: boolean;
  postOriginId: string;
  refetch: () => void;
}
export default function Comment({
  data,
  IS_AUTHOR,
  postOriginId,
  refetch,
}: ICommentProps) {
  const [isModifying, setIsModifying] = useState(false);
  const [comment, setComment] = useState(data.commentContent);
  return (
    <article className="flex flex-col w-full max-w-4xl p-6 m-auto bg-white border-2 border-gray-100 gap-7">
      <div className="flex justify-between">
        <Link
          className="flex items-center gap-2 font-semibold"
          href={`/profile/${data.commentAuthorId}`}
        >
          <Avatar
            src={`${BASE_URL}${data.commentAuthorProfileImgPath}`}
            alt="user_icon"
            size="sm"
          />
          <div className="flex flex-col font-bold">
            <span className="text-md ">{data.commentAuthorName}</span>
            <div className="flex">
              <span className="text-xs text-gray-400 after:content-['|'] after:mx-1">{`${data.commentAuthorDevelopAnnual}년차 개발자`}</span>
              <span className="text-xs text-gray-400">
                {parseDate(data.commentCreatedAt)}
              </span>
            </div>
          </div>
        </Link>

        {IS_AUTHOR && (
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
              refetch={refetch}
            />
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
        <p className="text-gray-500 text-md">{comment}</p>
      )}
    </article>
  );
}
