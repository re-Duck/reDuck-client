'use client';

import { Icon } from '@iconify/react';
import { Editor } from '@tiptap/react';
import React from 'react';

function Bold({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('bold') ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon icon="healthicons:b" fontSize={32} color="black" />
    </button>
  );
}

export default Bold;
