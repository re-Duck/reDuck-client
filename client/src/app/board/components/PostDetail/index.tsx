'use client';

//core
import React, { useEffect } from 'react';
import Link from 'next/link';

//interface
import { IPostInformation } from '@/types';

//component
import { Avatar, Divider } from '@/components';
import { DeleteButton, ModifyCotentButton } from '../../../../components/Post';
import { Icon } from '@iconify/react';

//util and constant
import { parseDate } from '@/util';
import { BASE_URL } from '@/service/base/api';

//tiptap
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import { common, createLowlight } from 'lowlight';
import { ImageResize } from 'tiptap-extension-resize-image';
import tiptapLink from '@tiptap/extension-link';

interface PostDetail {
  data: Omit<IPostInformation, 'commentsCount'>;
  IS_AUTHOR: boolean;
}

export default function PostDetail({ data, IS_AUTHOR }: PostDetail) {
  const lowlight = createLowlight(common);
  const url = data.postAuthorId
    ? `${BASE_URL}${data.postAuthorProfileImgPath}`
    : '';
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      ImageResize.configure({ inline: true, allowBase64: true }),
      tiptapLink,
    ],
    editable: false,
    content: data.postContent,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(data.postContent);
    }
  }, [data]);

  return (
    <article className="flex flex-col max-w-4xl min-w-full m-auto bg-white">
      <h1 className="text-4xl font-bold pt-12 pb-[38px] ">{data.postTitle}</h1>
      <div className="relative flex items-center pb-4 border-b border-blue-gray-scale-50">
        <Avatar src={url} alt="user_icon" size="xs" />
        <span className="ml-1 text-sm">{data.postAuthorName}</span>
        <Divider type="vertical" margin={3} thin={1} />
        <span className="text-sm text-gray-scale-600">
          {parseDate(data?.postCreatedAt)}
        </span>
        <Icon
          icon="mingcute:more-2-fill"
          fontSize={24}
          className="absolute right-0 top-1/2 -translate-y-2/4 text-gray-scale-600"
        />
      </div>

      <EditorContent id="tiptap-board" editor={editor} />

      <div className="flex justify-between">
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
            <DeleteButton
              id={data.postOriginId}
              type="post"
              postOriginId={data.postOriginId}
            />
          </div>
        )}
      </div>
      <p className="text-gray-400">{parseDate(data?.postCreatedAt)}</p>
      <hr />
      <p className="text-sm text-gray-400">{`좋아요 ${data.likes} | 조회 ${data.hits}`}</p>
    </article>
  );
}
