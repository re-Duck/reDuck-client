import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import ToolBar from './Toolbar';

//tiptap
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';

interface TiptapProps {
  content: string;
}

const Tiptap = ({ content }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
    ],
  });

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
