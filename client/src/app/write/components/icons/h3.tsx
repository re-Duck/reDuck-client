import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/h3';

function H3({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={`hover:opacity-40  ${
        editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default H3;
