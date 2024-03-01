import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/italic';

function Italic({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`hover:opacity-40  ${
        editor.isActive('italic') ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default Italic;
