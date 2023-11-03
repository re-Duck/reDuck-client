import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toolbar from './index';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/write/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '게시글 작성시 사용되는 툴바입니다.',
  },
  argTypes: {
    editor: {
      description:
        'tiptap 에디터 객체입니다. 이 객체를 통해 에디터를 조작합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Primary: Story = {
  decorators: [
    () => {
      const editor = useEditor({
        extensions: [
          StarterKit,
          Highlight,
          Image.configure({ inline: true, allowBase64: true }),
        ],
      });
      return <Toolbar editor={editor} />;
    },
  ],
};
