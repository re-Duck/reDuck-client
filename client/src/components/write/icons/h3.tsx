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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32"
        viewBox="0 -960 960 960"
        width="32"
      >
        <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z" />
      </svg>
    </button>
  );
}

export default H3;
