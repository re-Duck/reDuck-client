import type { Meta, StoryObj } from '@storybook/react';
import Box from './index';

const meta: Meta<typeof Box> = {
  title: 'Components/common/Skeleton/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '스켈레톤 박스 컴포넌트입니다.',
  },
  argTypes: {
    width: {
      description: '스켈레톤 박스의 너비를 나타내는 문자열입니다.',
    },
    height: {
      description: '스켈레톤 박스의 높이를 나타내는 문자열입니다.',
    },
    bgColor: {
      description: '스켈레톤 박스의 배경 색상을 나타내는 문자열입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Primary: Story = {
  args: { width: 'w-40', height: 'h-10' },
};
