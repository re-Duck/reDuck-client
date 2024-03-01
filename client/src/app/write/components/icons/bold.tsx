import { Editor } from '@tiptap/react';
import Icon from '@/assets/Icon/bold';

function Bold({ editor }: { editor: Editor }) {
  return (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`hover:opacity-40  ${
        editor.isActive('bold') ? 'is-active' : ''
      }`}
      type="button"
    >
      <Icon className="w-[30px] h-[30px]" />
    </button>
  );
}

export default Bold;
