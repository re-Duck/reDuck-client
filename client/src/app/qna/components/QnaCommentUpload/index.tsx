'use client';

import { EditorContent } from '@tiptap/react';

//components
import { Button } from '@/components';
import CommentToolbar from '../Toolbar';

//hooks
import useTipTap from '@/app/write/hooks/useTiptap';

export default function QnaCommentUpload() {
  const { editor } = useTipTap({ placeholder: '답변을 작성해주세요.' });

  return (
    <div className="py-9 mt-[59px]">
      <div className="px-6 py-3 mb-5 border border-gray-scale-400">
        <CommentToolbar />
        <EditorContent id="tiptap-comment" editor={editor} />
      </div>
      <div className="ml-auto w-fit">
        <Button color="blue_gray">답변 작성</Button>
      </div>
    </div>
  );
}
