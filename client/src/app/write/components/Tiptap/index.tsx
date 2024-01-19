'use client';

import React, { useEffect } from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import ToolBar from '../Toolbar';

interface TiptapProps {
  content: string;
  editor: Editor | null;
}

const Tiptap = ({ content, editor }: TiptapProps) => {
  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);
  return (
    <div className="border-2">
      <ToolBar editor={editor} />
      <EditorContent
        id="tiptap"
        editor={editor}
        onClick={() => editor?.commands.focus()}
      />
    </div>
  );
};

export default Tiptap;
