import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/h4';

function H4({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      className={`hover:opacity-40  ${
        editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default H4;
