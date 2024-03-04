'use client';

//core
import React, { useEffect } from 'react';

//interface
import { IPostInformation } from '@/types';

//component
import { Avatar, Divider } from '@/components';
import PostProfile from '../PostProfile';
import { MoreButton, FloatingBar } from '../../../../components/Post';

// hooks
import useCopyClipBoard from '@/hooks/common/useCopyClipBoard';

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

  const onCopy = useCopyClipBoard();

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(data.postContent);
    }
  }, [data]);

  return (
    <article className="flex flex-col max-w-4xl min-w-full m-auto bg-white">
      <h1 className="sm:text-headline3 text-headline4 pt-[38px] pb-6">
        {data.postTitle}
      </h1>
      <div className="relative flex items-center pb-4 border-b border-blue-gray-scale-50">
        <Avatar src={url} alt="user_icon" size="xs" />
        <span className="ml-1 text-body3 text-gray-scale-900">
          {data.postAuthorName}
        </span>
        <Divider type="vertical" margin={3} thin={1} />
        <span className="text-body3 text-gray-scale-600">
          {parseDate(data?.postCreatedAt)}
        </span>
        <div className="flex items-end gap-2 ml-auto">
          <span
            className="hidden text-body3 text-gray-scale-600 hover:cursor-pointer sm:block"
            onClick={onCopy}
          >
            URL 복사
          </span>
          <MoreButton IS_AUTHOR={IS_AUTHOR} postOriginId={data.postOriginId} />
        </div>
      </div>
      <div className="relative h-full">
        <FloatingBar.FloatingBarContainer>
          <FloatingBar.FloatingBarLike
            InitialLikes={data.likes}
            postOriginId={data.postOriginId}
          />
          <FloatingBar.FloatingBarBookMark postOriginId={data.postOriginId} />
          <FloatingBar.FloatingBarShare />
        </FloatingBar.FloatingBarContainer>
        <EditorContent
          className="pt-8 pb-20"
          id="tiptap-board"
          editor={editor}
        />
      </div>
      <PostProfile
        userId={data.postAuthorId}
        userName={data.postAuthorName}
        imageUrl={url}
      />
    </article>
  );
}
