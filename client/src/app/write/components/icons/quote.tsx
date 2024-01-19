'use client';

import { Icon } from '@iconify/react';
import { Editor } from '@tiptap/react';
import React from 'react';

function Quote({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      className={`opacity-70 hover:opacity-40  ${
        editor.isActive('blockquote') ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon icon="tabler:quote" fontSize={32} color="black" />
    </button>
  );
}

export default Quote;
