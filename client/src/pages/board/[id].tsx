import React from 'react';
import { Layout, PostDetail, Comment } from '@/components';
import Image from 'next/image';

import googleLogo from '../../assets/images/google_logo.png';
import { BASE_URL, axios_get } from '@/service/base/api';
import { IPostInformation } from '@/types';
import { useSession } from 'next-auth/react';

interface IPostDetailPage {
  pageProps: {
    data: IPostInformation;
  };
}
export default function PostDetailPage({ pageProps }: IPostDetailPage) {
  const data = pageProps.data;
  const session = useSession();
  const user = session.data?.user;
  const comentImgSrc = user
    ? `${BASE_URL}${user.userProfileImgPath}`
    : googleLogo;

  return (
    <Layout>
      <div className="flex flex-col max-w-4xl m-auto gap-14 mb-4">
        <PostDetail data={data} />
        <h3 className="text-2xl font-bold pl-3">댓글 3</h3>
        <div className="flex flex-col border-gray-100 border-[1px] border-collapse">
          <div className="flex justify-between items-center gap-1 h-16 bg-white border-gray-100 border-[1px] px-10">
            <Image
              src={comentImgSrc}
              alt="googleLogo"
              width={20}
              height={20}
              className="rounded-full w-10 h-10"
            />

            <input
              className=" border-b-gray-200 border-b-[1px] p-2 pl-3 w-9/12"
              placeholder="댓글을 입력해 보세요."
            />
            <button className=" bg-red-400 rounded-lg px-3 py-2 text-white text-xs">
              등록
            </button>
          </div>

          <article>
            <Comment />
          </article>
          <article>
            <Comment />
          </article>
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
