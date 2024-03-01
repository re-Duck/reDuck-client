import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/h2';

function H2({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={`hover:opacity-40  ${
        editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default H2;
