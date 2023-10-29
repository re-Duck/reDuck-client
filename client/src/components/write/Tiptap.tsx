import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import ToolBar from './Toolbar';

interface TiptapProps {
  content: string;
}

const Tiptap = ({ content }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
  });

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);
  return (
    <div className="border-2">
      <ToolBar editor={editor} />
      <EditorContent id="tiptap" editor={editor} />
    </div>
  );
};

export default Tiptap;
