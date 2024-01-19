'use client';

import { Icon } from '@iconify/react';
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
      <Icon icon="majesticons:italic-line" fontSize={32} color="black" />
    </button>
  );
}

export default Italic;
