import React from 'react';

//components
import { ModifyCommentButton, DeleteButton } from './';

//service
import { BASE_URL } from '@/service/base/api';

//types
import { IComment } from '@/types';
import Link from 'next/link';
import Avatar from '../Avatar';

interface ICommentProps {
  data: IComment;
  IS_AUTHOR: boolean;
  token: string;
  postOriginId: string;
  refetch: () => void;
}
export default function Comment({
  data,
  IS_AUTHOR,
  token,
  postOriginId,
  refetch,
}: ICommentProps) {
  const [isModifying, setIsModifying] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>(data.commentContent);

  return (
    <article className="flex flex-col w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <div className="flex justify-between">
        <Link
          className="flex gap-2 font-semibold items-center"
          href={`/profile/${data.commentAuthorId}`}
        >
          <Avatar
            src={`${BASE_URL}${data.commentAuthorProfileImgPath}`}
            alt="user_icon"
            size="sm"
          />
          <div className="flex flex-col font-bold">
            <span className="text-md ">{data.commentAuthorName}</span>
            <span className="text-xs text-gray-400">{`${data.commentAuthorDevelopAnnual}년차 개발자 `}</span>
          </div>
        </Link>

        {IS_AUTHOR && (
          <div className="flex gap-2">
            <ModifyCommentButton
              id={data.commentOriginId}
              token={token}
              comment={comment}
              postOriginId={postOriginId}
              isModifying={isModifying}
              setIsModifying={setIsModifying}
            />
            {isModifying && (
              <button onClick={() => setIsModifying(false)}>취소</button>
            )}
            <DeleteButton
              id={data.commentOriginId}
              token={token}
              type="comment"
              refetch={refetch}
            />
          </div>
        )}
      </div>
      {isModifying ? (
        <input
          className="text-md text-gray-500  rounded-md p-1 pl-4 border-2 border-gray-200 focus:outline-none focus:border-gray-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      ) : (
        <p className="text-md text-gray-500">{comment}</p>
      )}
    </article>
  );
}
