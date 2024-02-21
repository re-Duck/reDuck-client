'use client';

// react, next
import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

// components
import { Comment, CommentUpload } from '../../../../components/Post';
import { PostDetail } from '@/app/board/components';

// types
import { IBoardPostInformation, IComment } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

// service
import { postManager } from '@/service/post';
import { commentManager } from '@/service/comment';

interface IProps {
  postOriginId: string;
  initialData?: IBoardPostInformation;
}

function PostContent({ postOriginId, initialData }: IProps) {
  const user = useSelector((state: IReduxState) => state.auth);

  const { data: postData } = useQuery({
    queryKey: [`${postOriginId}`],
    queryFn: () => postManager.getPost({ postOriginId }),
    initialData: initialData,
    retry: false,
    suspense: true,
  });

  const { data: postComment } = useQuery({
    queryKey: [`${postOriginId}/comment`],
    queryFn: () => commentManager.getComments({ postOriginId }),
    retry: false,
    suspense: true,
  });

  const IS_POST_AUTHOR = user.userId === postData?.postAuthorId;

  return (
    <div className="flex flex-col max-w-[850px] m-auto mb-4">
      <PostDetail
        data={postData as IBoardPostInformation}
        IS_AUTHOR={IS_POST_AUTHOR}
      />
      <h3 className="text-lg font-bold mt-[52px] mb-[30px] text-gray-scale-800">
        {postComment?.length}개의 댓글
      </h3>
      <CommentUpload user={user} postOriginId={postOriginId} />
      {postComment
        ?.filter(
          (comment: IComment) => comment.parentCommentOriginId === 'root'
        )
        .map((comment: IComment) => (
          <Comment
            key={comment.commentOriginId}
            data={comment}
            IS_AUTHOR={user.userId === comment.commentAuthorId}
            postOriginId={postOriginId}
          >
            {postComment
              ?.filter(
                (reply: IComment) =>
                  reply.parentCommentOriginId === comment.commentOriginId
              )
              .map((reply: IComment) => (
                <Comment
                  key={reply.commentOriginId}
                  data={reply}
                  IS_AUTHOR={user.userId === reply.commentAuthorId}
                  postOriginId={postOriginId}
                />
              ))}
          </Comment>
        ))}
    </div>
  );
}

export default PostContent;
