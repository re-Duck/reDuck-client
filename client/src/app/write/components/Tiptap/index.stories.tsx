import type { Meta, StoryObj } from '@storybook/react';
import Tiptap from './index';

const meta: Meta<typeof Tiptap> = {
  title: 'Components/write/Tiptap',
  component: Tiptap,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '게시글 작성 시 사용되는 에디터 컴포넌트입니다.',
  },
  argTypes: {
    content: {
      description: '게시글의 내용을 담고 있는 문자열입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tiptap>;

export const Primary: Story = {};
