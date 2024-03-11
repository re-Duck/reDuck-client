'use client';

import { useEffect } from 'react';

//components
import { Divider } from '@/components';
import { MoreButton, FloatingBar } from '@/components/Post';

//hooks
import useCopyClipBoard from '@/hooks/common/useCopyClipBoard';

//utils
import { parseDate } from '@/util';

//types
import { IPostInformation } from '@/types';

//tiptap
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { ImageResize } from 'tiptap-extension-resize-image';
import tiptapLink from '@tiptap/extension-link';

interface IQnaDetail {
  data: Omit<IPostInformation, 'commentsCount'>;
  IS_AUTHOR: boolean;
}

export default function QnaDetail({ data, IS_AUTHOR }: IQnaDetail) {
  const lowlight = createLowlight(common);

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
        <div>
          <span className="text-body3 text-gray-scale-600">
            {parseDate(data?.postCreatedAt)}
          </span>
          <Divider type="vertical" margin={3} thin={1} />
          <span className="text-body3 text-gray-scale-600">
            {data?.hits} 조회
          </span>
        </div>
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
          <FloatingBar.FloatingBarBookMark postOriginId={data.postOriginId} />
          <FloatingBar.FloatingBarShare />
        </FloatingBar.FloatingBarContainer>
        <EditorContent
          className="pt-8 pb-20"
          id="tiptap-board"
          editor={editor}
        />
      </div>
    </article>
  );
}
