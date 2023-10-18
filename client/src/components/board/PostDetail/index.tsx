import React, { useEffect, useState } from 'react';

//next
import dynamic from 'next/dynamic';

//react-quill
import ReactQuill, { ReactQuillProps } from 'react-quill';

//interface
import { IPostInformation } from '@/types';

//component
import { Avatar } from '@/components';

//util and constant
import { parseDate } from '@/util';
import { BASE_URL } from '@/service/base/api';
import Link from 'next/link';
import { DeleteButton, ModifyCotentButton } from '@/components/common/Post';

interface PostDetail {
  data: Omit<IPostInformation, 'commentsCount'>;
  IS_AUTHOR: boolean;
  token: string;
}

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}
const Content = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    const component = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <RQ ref={forwardedRef} {...props} readOnly id="postContent" />
    );
    return component;
  },

  {
    ssr: false,
  }
);

export default function PostDetail({ data, IS_AUTHOR, token }: PostDetail) {
  const [html, setHTML] = useState<string>('');
  const url = data.postAuthorId
    ? `${BASE_URL}${data.postAuthorProfileImgPath}`
    : '';

  useEffect(() => {
    setHTML(data.postContent);
  }, [data]);
  return (
    <article className="flex flex-col max-w-4xl min-w-full gap-8 px-4 py-6 m-auto bg-white border-2 border-gray-100 sm:p-12">
      <h1 className="text-4xl font-extrabold ">{data.postTitle}</h1>
      <div className="flex justify-between mb-5">
        <Link
          className="flex items-center gap-2 font-semibold"
          href={`/profile/${data.postAuthorId}`}
        >
          <Avatar src={url} alt="user_icon" size="sm" />
          <div className="flex flex-col gap-1 font-bold">
            <span className="text-md ">{data.postAuthorName}</span>
            <span className="text-xs text-gray-400">{`${data.postAuthorDevelopAnnual}년차 개발자 `}</span>
          </div>
        </Link>

        {IS_AUTHOR && (
          <div className="flex gap-1 font-normal text-gray-500">
            <ModifyCotentButton postOriginId={data.postOriginId} />
            <DeleteButton token={token} id={data.postOriginId} type="post" />
          </div>
        )}
      </div>
      <Content forwardedRef={null} modules={{ toolbar: false }} value={html} />

      <p className="text-gray-400">{parseDate(data?.postCreatedAt)}</p>
      <hr />
      <p className="text-sm text-gray-400">좋아요 0 | 조회 0</p>
    </article>
  );
}
