'use client';

import { Icon } from '@iconify/react';
import { Editor } from '@tiptap/react';
import React from 'react';

function H2({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon
        icon="material-symbols:format-h2-rounded"
        fontSize={32}
        color="black"
      />
    </button>
  );
}

export default H2;
