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

interface IProps {
  postOriginId: string;
}

function PostContent({ postOriginId }: IProps) {
  const user = useSelector((state: IReduxState) => state.auth);

  const { data } = useQuery({
    queryKey: [`${postOriginId}`],
    queryFn: () => postManager.getPost({ postOriginId }),
    retry: false,
    suspense: true,
  });
  const comments = data?.comments;
  const IS_POST_AUTHOR = user.userId === data?.postAuthorId;

  return (
    <div className="flex flex-col max-w-4xl m-auto mb-4 gap-14">
      <PostDetail
        data={data as IBoardPostInformation}
        IS_AUTHOR={IS_POST_AUTHOR}
      />
      <h3 className="pl-3 text-2xl font-bold">댓글 {comments?.length}</h3>
      <div className="flex flex-col border-gray-100 border-[1px] border-collapse">
        <CommentUpload user={user} />
        {comments?.map((comment: IComment) => (
          <Comment
            key={comment.commentOriginId}
            data={comment}
            IS_AUTHOR={user.userId === comment.commentAuthorId}
            postOriginId={postOriginId}
          />
        ))}
      </div>
    </div>
  );
}

export default PostContent;
