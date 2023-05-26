import React from 'react';

//components
import { Layout, PostDetail, Comment, CommentUpload } from '@/components';

//service
import { axios_get } from '@/service/base/api';

//types
import { IPostInformation } from '@/types';

//next-auth
import { useSession } from 'next-auth/react';

interface IPostDetailPage {
  pageProps: {
    data: IPostInformation;
  };
}

interface IComment {
  commentOriginId: number;
  commentContent: string;
  commentCreatedAt: string;
  commentUpdatedAt: string;
  commentAuthorId: string;
  commentAuthorName: string;
}
export default function PostDetailPage({ pageProps }: IPostDetailPage) {
  const session = useSession();
  const user = session.data?.user;
  const data: IPostInformation = pageProps.data;
  const comments: IComment[] | null = data?.comments;
  const IS_AUTHOR = user?.id === data.postAuthorId;

  return (
    <Layout>
      <div className="flex flex-col max-w-4xl m-auto gap-14 mb-4">
        <PostDetail data={data} IS_AUTHOR={IS_AUTHOR} />
        <h3 className="text-2xl font-bold pl-3">댓글 {comments?.length}</h3>
        <div className="flex flex-col border-gray-100 border-[1px] border-collapse">
          <CommentUpload user={user} />
          {comments?.map((comment: IComment) => (
            <Comment
              key={comment.commentOriginId}
              data={comment}
              IS_AUTHOR={IS_AUTHOR}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const postOriginId = context.params.id;
  const suburl = `/post/detail/${postOriginId}`;
  const res = await axios_get({ suburl });

  return { props: { data: res.data } };
}
