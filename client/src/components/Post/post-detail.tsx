import React, { useEffect, useState } from 'react';

//interface
import { IPostInformation } from '@/types';
import { parseDate } from '@/util';
import Image from 'next/image';
import { BASE_URL } from '@/service/base/api';
import user_icon from '@/assets/images/user_icon.png';
import DeleteButton from './delete-button';
import ModifyCotentButton from './modify-content-button';
import dynamic from 'next/dynamic';
import ReactQuill, { ReactQuillProps } from 'react-quill';

interface PostDetail {
  data: IPostInformation;
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
      <RQ ref={forwardedRef} {...props} readOnly className="border-red-300" />
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
    : user_icon;

  useEffect(() => {
    setHTML(data.postContent);
  }, [data]);
  return (
    <article className="flex flex-col min-w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-4">
      <h1 className="text-xl font-bold">{data.postTitle}</h1>
      <h2 className="text-md font-semibold"></h2>
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 font-semibold">
          <Image
            src={url}
            alt="user_icon"
            width="0"
            height="0"
            className="rounded-full w-6 h-6"
          />
          <p>{data.postAuthorName}</p>
        </div>
        {IS_AUTHOR && (
          <div className="flex gap-1 font-normal text-gray-500">
            <ModifyCotentButton postOriginId={data.postOriginId} />
            <DeleteButton token={token} id={data.postAuthorId} type="post" />
          </div>
        )}
      </div>
      <Content forwardedRef={null} modules={{ toolbar: false }} value={html} />

      <p className="text-gray-400">{parseDate(data?.postCreatedAt)}</p>
      <hr />
      <p className="text-gray-400 text-sm">좋아요 0 | 조회 0</p>
    </article>
  );
}
