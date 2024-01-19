'use client';

import { Icon } from '@iconify/react';
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
      <Icon icon="material-symbols:code" fontSize={32} color="black" />
    </button>
  );
}

export default Code;
