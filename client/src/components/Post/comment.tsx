import Image from 'next/image';
import React, { useEffect } from 'react';

import user_icon from '../../assets/images/user_icon.png';
import { BASE_URL } from '@/service/base/api';
import DeleteButton from './delete-button';
import { IComment } from '@/types';
import ModifyCommentButton from './modify-comment-button';
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
        <div className="flex gap-4">
          <Image
            src={`${BASE_URL}${data.commentAuthorProfileImgPath}` || user_icon}
            alt="user_icon"
            width="0"
            height="0"
            className="rounded-full w-8 h-8"
          />
          <span className=" font-semibold">{data.commentAuthorName}</span>
        </div>
        {IS_AUTHOR && (
          <div className="flex gap-2">
            <ModifyCommentButton
              id={data.commentOriginId}
              token={token}
              type="comment"
              refetch={refetch}
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
