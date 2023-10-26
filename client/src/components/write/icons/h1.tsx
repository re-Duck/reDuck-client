import React from 'react';
import { Editor } from '@tiptap/react';

function H1({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        viewBox="0 -960 960 960"
        width="32"
      >
        <path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z" />
      </svg>
    </button>
  );
}

export default H1;
