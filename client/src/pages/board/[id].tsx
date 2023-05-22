import React from 'react';
import { Layout, PostDetail, Comment, CommentUpload } from '@/components';

import { axios_get } from '@/service/base/api';
import { IPostInformation } from '@/types';
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
  const data = pageProps.data;
  const session = useSession();
  const user = session.data?.user;
  const comments = data.comments as IComment[] | null;

  return (
    <Layout>
      <div className="flex flex-col max-w-4xl m-auto gap-14 mb-4">
        <PostDetail data={data} />
        <h3 className="text-2xl font-bold pl-3">댓글 3</h3>
        <div className="flex flex-col border-gray-100 border-[1px] border-collapse">
          <CommentUpload user={user} />
          {comments?.map((comment: IComment) => (
            <Comment key={comment.commentOriginId} data={comment} />
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
