import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/h1';

function H1({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={`hover:opacity-40  ${
        editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default H1;
