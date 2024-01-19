'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import { Icon } from '@iconify/react';

function H1({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon
        icon="material-symbols:format-h1-rounded"
        fontSize={32}
        color="black"
      />
    </button>
  );
}

export default H1;
