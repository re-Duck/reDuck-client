'use client';

//core
import React, { useEffect } from 'react';

//interface
import { IPostInformation } from '@/types';

//component
import { Avatar, Divider } from '@/components';
import PostProfile from '../PostProfile';
import { MoreButton } from '../../../../components/Post';

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
      <div className="relative flex items-center pb-4 mb-10 border-b border-blue-gray-scale-50">
        <Avatar src={url} alt="user_icon" size="xs" />
        <span className="ml-1 text-sm">{data.postAuthorName}</span>
        <Divider type="vertical" margin={3} thin={1} />
        <span className="text-sm text-gray-scale-600">
          {parseDate(data?.postCreatedAt)}
        </span>
        <MoreButton IS_AUTHOR={IS_AUTHOR} />
      </div>
      <EditorContent id="tiptap-board" editor={editor} />
      <PostProfile
        userId={data.postAuthorId}
        userName={data.postAuthorName}
        imageUrl={url}
      />
    </article>
  );
}
