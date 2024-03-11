//tiptap
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Link from '@tiptap/extension-link';

import { common, createLowlight } from 'lowlight';
import { ImageResize } from 'tiptap-extension-resize-image';

function useTipTap({ placeholder = '' }: { placeholder?: string }) {
  const lowlight = createLowlight(common);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      ImageResize.configure({ inline: true, allowBase64: true }),
      Link,
      Placeholder.configure({
        placeholder,
      }),
    ],
  });
  return { editor };
}

export default useTipTap;
