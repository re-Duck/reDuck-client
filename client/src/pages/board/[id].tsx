import React from 'react';

//components
import { Layout, PostDetail, Comment, CommentUpload } from '@/components';

//service
import { axios_get } from '@/service/base/api';

//types
import { IComment } from '@/types';

//next-auth
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  pageProps: {
    postOriginId: string;
  };
}
export default function PostDetailPage({ pageProps }: IProps) {
  const session = useSession();

  const user = session.data?.user;
  const suburl = `/post/detail/${pageProps.postOriginId}`;
  const { data, isLoading, refetch } = useQuery(['detail-post'], async () => {
    const res = await axios_get({ suburl });
    return res.data;
  });
  const comments = data?.comments;
  const IS_POST_AUTHOR = user?.id === data?.postAuthorId;
  return (
    <Layout>
      {!isLoading && (
        <div className="flex flex-col max-w-4xl m-auto gap-14 mb-4">
          <PostDetail
            data={data}
            IS_AUTHOR={IS_POST_AUTHOR}
            token={user ? user.token : ''}
          />
          <h3 className="text-2xl font-bold pl-3">댓글 {comments?.length}</h3>
          <div className="flex flex-col border-gray-100 border-[1px] border-collapse">
            <CommentUpload user={user} refetch={refetch} />
            {comments?.map((comment: IComment) => (
              <Comment
                key={comment.commentOriginId}
                data={comment}
                token={user ? user.token : ''}
                IS_AUTHOR={user?.id === comment.commentAuthorId}
                postOriginId={pageProps.postOriginId}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
export async function getServerSideProps(context: any) {
  const postOriginId = context.params.id;

  return { props: { postOriginId } };
}
