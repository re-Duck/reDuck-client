import { Editor } from '@tiptap/react';
import React from 'react';

function Strikethrough({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('strike') ? 'is-active' : ''
      }`}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        viewBox="0 -960 960 960"
        width="32"
      >
        <path d="M80-400v-80h800v80H80Zm340-160v-120H200v-120h560v120H540v120H420Zm0 400v-160h120v160H420Z" />
      </svg>
    </button>
  );
}

export default Strikethrough;
