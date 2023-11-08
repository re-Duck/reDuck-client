import { Icon } from '@iconify/react';
import { Editor } from '@tiptap/react';
import React from 'react';

function H3({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon
        icon="material-symbols:format-h3-rounded"
        fontSize={32}
        color="black"
      />
    </button>
  );
}

export default H3;
