'use client';

//core
import React, { useCallback } from 'react';

//third party
import { Editor } from '@tiptap/react';
import { Icon } from '@iconify/react';

function Link({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('연결할 URL를 입력하세요.', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);
  return (
    <button
      type="button"
      className="relative w-8 h-8 cursor-pointer opacity-70 hover:opacity-40"
      onClick={setLink}
    >
      <Icon icon="mingcute:link-line" fontSize={32} color="black" />
    </button>
  );
}

export default Link;
