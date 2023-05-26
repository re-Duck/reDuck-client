import Image from 'next/image';
import React from 'react';

import user_icon from '../../assets/images/user_icon.png';
import { BASE_URL } from '@/service/base/api';
import DeleteButton from './delete-button';
import { IComment } from '@/types';
interface ICommentProps {
  data: IComment;
  IS_AUTHOR: boolean;
  token: string;
}
export default function Comment({ data, IS_AUTHOR, token }: ICommentProps) {
  console.log(data);
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
          <DeleteButton
            id={data.commentOriginId}
            token={token}
            type="comment"
          />
        )}
      </div>
      <p className="text-md text-gray-500">{data.commentContent}</p>
    </article>
  );
}
