import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/quote';

function Quote({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
      className={`hover:opacity-40  ${
        editor.isActive('blockquote') ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default Quote;
