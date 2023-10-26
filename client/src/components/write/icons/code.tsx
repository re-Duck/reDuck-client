import { Editor } from '@tiptap/react';
import React from 'react';

function Code({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('codeBlock') ? 'is-active' : ''
      }`}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        viewBox="0 -960 960 960"
        width="32"
      >
        <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
      </svg>
    </button>
  );
}

export default Code;
