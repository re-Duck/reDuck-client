//tiptap
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import { common, createLowlight } from 'lowlight';

function useTipTap() {
  const lowlight = createLowlight(common);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
  });
  return { editor };
}

export default useTipTap;
