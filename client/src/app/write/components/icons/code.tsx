import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/code';

function Code({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={`hover:opacity-40  ${
        editor.isActive('codeBlock') ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default Code;
