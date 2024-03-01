import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/strikethrough';

function Strikethrough({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={`hover:opacity-40  ${
        editor.isActive('strike') ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default Strikethrough;
