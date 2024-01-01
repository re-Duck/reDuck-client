//core
import React, { useEffect } from 'react';
import Link from 'next/link';

//interface
import { IPostInformation } from '@/types';

//component
import { Avatar } from '@/components';
import { DeleteButton, ModifyCotentButton } from '@/components/common/Post';

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
    <article className="flex flex-col max-w-4xl min-w-full gap-8 px-4 py-6 m-auto bg-white border-2 border-gray-100 sm:p-12">
      <h1 className="text-4xl font-extrabold ">{data.postTitle}</h1>
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
      <EditorContent id="tiptap-board" editor={editor} />

      <p className="text-gray-400">{parseDate(data?.postCreatedAt)}</p>
      <hr />
      <p className="text-sm text-gray-400">좋아요 0 | 조회 0</p>
    </article>
  );
}
