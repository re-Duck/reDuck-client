import type { Meta, StoryObj } from '@storybook/react';

import SendButton from './index';

const meta: Meta<typeof SendButton> = {
  title: 'Components/mygpt/SendButton',
  component: SendButton,
  tags: ['autodocs'],

  parameters: {
    componentSubtitle: 'GPT 페이지에서 사용되는 질문 전송 버튼 컴포넌트입니다.',
  },
  argTypes: {
    disabled: {
      description:
        '버튼 비활성화 여부입니다. 횟수부족 및 전송시에는 비활성화됩니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SendButton>;

export const Primary: Story = {
  args: {},
};
export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '비활성화 된 버튼입니다.',
      },
    },
  },
  args: {
    disabled: true,
  },
};
