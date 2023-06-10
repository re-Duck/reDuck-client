import React from 'react';
import Image from 'next/image';

//components
import { ModifyCommentButton, DeleteButton } from './';

//assets
import user_icon from '../../assets/images/user_icon.png';

//service
import { BASE_URL } from '@/service/base/api';

//types
import { IComment } from '@/types';
import Link from 'next/link';

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
          href={`/profile/${data.commentAuthorId}`}
          className="flex gap-2 items-center"
        >
          <Image
            src={`${BASE_URL}${data.commentAuthorProfileImgPath}` || user_icon}
            alt="user_icon"
            width="80"
            height="80"
            className="rounded-full w-8 h-8 border-[1px] p-0.5"
          />
          <span className=" font-semibold">{data.commentAuthorName}</span>
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
