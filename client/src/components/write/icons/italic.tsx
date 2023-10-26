import { Editor } from '@tiptap/react';
import React from 'react';

function Italic({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('italic') ? 'is-active' : ''
      }`}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        viewBox="0 -960 960 960"
        width="32"
      >
        <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
      </svg>
    </button>
  );
}

export default Italic;
