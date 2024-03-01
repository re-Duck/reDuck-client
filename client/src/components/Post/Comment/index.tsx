'use client';

import React, { PropsWithChildren, useState } from 'react';
import Link from 'next/link';

//components
import { ModifyComment, ReplyComment, DeleteComment, ReplyButton } from '..';
import { Avatar } from '@/components';
import { HeartIcon } from '@/assets/Icon';

//hooks
import useModal from '@/hooks/modal/useModal';

//service
import { BASE_URL } from '@/service/base/api';

//types
import { IComment } from '@/types';

//constants
import { ModalType, errorMessage } from '@/constants/constant';

//utils
import { parseDateWithDot } from '@/util';

interface ICommentProps extends PropsWithChildren {
  data: IComment;
  IS_AUTHOR: boolean;
  postOriginId: string;
}
export default function Comment({
  data,
  IS_AUTHOR,
  postOriginId,
  children,
}: ICommentProps) {
  const { openModal } = useModal();

  const [isModifying, setIsModifying] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [comment, setComment] = useState(data.commentContent);

  const childCount = React.Children.count(children);
  const isRoot = data.parentCommentOriginId === 'root';

  return (
    <article
      className={`${
        isRoot ? 'py-6 border-b' : 'pt-3 border-t'
      } border-blue-gray-scale-50`}
    >
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
            <span className="text-body3">{data.commentAuthorName}</span>
            <span className="text-caption1 text-gray-scale-600">
              {parseDateWithDot(data.commentCreatedAt)}
            </span>
          </div>
        </Link>
        {IS_AUTHOR && (
          <div className="absolute right-0 flex items-center gap-2 text-xs top-1/4 text-gray-scale-700">
            {!isModifying && (
              <span
                className="text-caption1 hover:underline hover:cursor-pointer"
                onClick={() => setIsModifying(true)}
              >
                수정
              </span>
            )}
            <DeleteComment
              commentOriginId={data.commentOriginId}
              postOriginId={postOriginId}
            />
          </div>
        )}
      </div>
      {isModifying ? (
        <ModifyComment
          id={data.commentOriginId}
          comment={comment}
          setComment={setComment}
          setIsModifying={setIsModifying}
          isRoot={isRoot}
        />
      ) : (
        <div className="relative pr-10 py-[18px]">
          <div className="absolute top-1/4 right-4 flex flex-col items-center gap-0.5">
            <HeartIcon
              className="hover:cursor-pointer"
              fill="none"
              stroke="#A1A1A1"
              width={20}
              height={20}
              onClick={() => {
                openModal({
                  type: ModalType.ERROR,
                  message: errorMessage.notComplete,
                });
              }}
            />
            <span className="text-caption1 text-gray-scale-500">0</span>
          </div>
          <span className="text-body3">{comment}</span>
        </div>
      )}

      {isRoot && (
        <>
          {childCount > 0 ? (
            isReplyOpen ? (
              <ReplyButton
                type="HIDDEN"
                onClick={() => setIsReplyOpen(false)}
              />
            ) : (
              <ReplyButton
                type="SHOW"
                onClick={() => setIsReplyOpen(true)}
                childCount={childCount}
              />
            )
          ) : (
            <>
              <ReplyButton
                type="REPLYFORROOT"
                onClick={() => setIsReplying(true)}
              />
              {isReplying && (
                <ReplyComment
                  onClose={() => setIsReplying(false)}
                  parentCommentOriginId={data.commentOriginId}
                  postOriginId={postOriginId}
                />
              )}
            </>
          )}
          {isReplyOpen && (
            <div className="pl-10">
              <div className="border-t border-blue-gray-scale-50 mt-[18px]">
                {children}
              </div>

              {isReplying ? (
                <ReplyComment
                  onClose={() => setIsReplying(false)}
                  parentCommentOriginId={data.commentOriginId}
                  postOriginId={postOriginId}
                />
              ) : (
                <ReplyButton
                  type="REPLYFORREPLY"
                  onClick={() => setIsReplying(true)}
                />
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
}
