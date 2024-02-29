import React from 'react';
import { Editor } from '@tiptap/react';
import { Icon } from '../icons';

interface ToolBarProps {
  editor: Editor | null;
}
function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-8 px-4 py-8 border-b border-blue-gray-scale-50">
      <div className="flex items-center justify-center gap-2">
        <Icon.H1 editor={editor} />
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-1">
        <Icon.Bold editor={editor} />
        <Icon.Italic editor={editor} />
        <Icon.Strikethrough editor={editor} />
        <Icon.Code editor={editor} />
      </div>

      <div className="flex items-center justify-center gap-1">
        <Icon.Quote editor={editor} />
        <Icon.AddPhoto editor={editor} />
        <Icon.Link editor={editor} />
      </div>
    </div>
  );
}

export default ToolBar;
