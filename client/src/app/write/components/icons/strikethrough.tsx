'use client';

import { Icon } from '@iconify/react';
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
      <Icon icon="gg:format-strike" fontSize={32} color="black" />
    </button>
  );
}

export default Strikethrough;
