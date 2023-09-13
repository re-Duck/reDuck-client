import { Comment, CommentUpload, PostDetail } from '@/components/common/Post';
import { axios_get } from '@/service/base/api';
import { IComment } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';

interface IProps {
  postOriginId: string;
}

function PostContent({ postOriginId }: IProps) {
  const session = useSession();

  const user = session.data?.user;
  const suburl = `/post/detail/${postOriginId}`;
  const { data, refetch } = useQuery({
    queryKey: [`${postOriginId}`],
    queryFn: async () => {
      const res = await axios_get({ suburl });
      return res.data;
    },
    suspense: true,
  });
  const comments = data?.comments;
  const IS_POST_AUTHOR = user?.id === data?.postAuthorId;

  return (
    <div className="flex flex-col max-w-4xl m-auto gap-14 mb-4">
      <PostDetail
        data={data}
        IS_AUTHOR={IS_POST_AUTHOR}
        token={user ? user.token : ''}
      />
      <h3 className="text-2xl font-bold pl-3">댓글 {comments?.length}</h3>
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
