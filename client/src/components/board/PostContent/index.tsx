import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { Comment, CommentUpload } from '@/components/common/Post';
import { PostDetail } from '@/components/board';
import { IBoardPostInformation, IComment } from '@/types';
import { postManager } from '@/service/post';

interface IProps {
  postOriginId: string;
}

function PostContent({ postOriginId }: IProps) {
  const user = useSelector((state: any) => state.auth);

  const { data, refetch } = useQuery({
    queryKey: [`${postOriginId}`],
    queryFn: async () => await postManager.getPost({ postOriginId }),
    retry: false,
    suspense: true,
  });
  const comments = data?.comments;
  const IS_POST_AUTHOR = user?.id === data?.postAuthorId;

  return (
    <div className="flex flex-col max-w-4xl m-auto mb-4 gap-14">
      <PostDetail
        data={data as IBoardPostInformation}
        IS_AUTHOR={IS_POST_AUTHOR}
        token={user ? user.token : ''}
      />
      <h3 className="pl-3 text-2xl font-bold">댓글 {comments?.length}</h3>
      <div className="flex flex-col border-gray-100 border-[1px] border-collapse">
        <CommentUpload
          user={user}
          refetch={() => {
            refetch();
            setTimeout(
              () => window.scrollTo(0, document.body.scrollHeight),
              100
            );
          }}
        />
        {comments?.map((comment: IComment) => (
          <Comment
            key={comment.commentOriginId}
            data={comment}
            token={user ? user.token : ''}
            IS_AUTHOR={user?.id === comment.commentAuthorId}
            postOriginId={postOriginId}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}

export default PostContent;
