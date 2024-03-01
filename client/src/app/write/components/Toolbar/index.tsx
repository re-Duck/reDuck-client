import React from 'react';
import { Editor } from '@tiptap/react';
import { Icon } from '../icons';

interface ToolBarProps {
  editor: Editor | null;
}
function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-8 border-b sm:gap-6 border-blue-gray-scale-50">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Icon.H1 editor={editor} />
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
        <Icon.H4 editor={editor} />
      </div>
      <span className="h-[20px] w-[1px] bg-gray-scale-400 hidden sm:block"></span>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Icon.Bold editor={editor} />
        <Icon.Italic editor={editor} />
        <Icon.Strikethrough editor={editor} />
        <Icon.Quote editor={editor} />
        <Icon.Link editor={editor} />
        <Icon.AddPhoto editor={editor} />
      </div>
      <span className="h-[20px] w-[1px] bg-gray-scale-400 hidden sm:block"></span>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Icon.Code editor={editor} />
      </div>
    </div>
  );
}

export default ToolBar;
