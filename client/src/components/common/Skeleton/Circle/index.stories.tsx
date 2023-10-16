import type { Meta, StoryObj } from '@storybook/react';
import Circle from './index';

const meta: Meta<typeof Circle> = {
  title: 'Components/common/Skeleton/Circle',
  component: Circle,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '스켈레톤 서클 컴포넌트입니다.',
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
    rounded: {
      description: '스켈레톤 박스의 둥근 정도를 나타내는 문자열입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Circle>;

export const Primary: Story = {
  args: { width: 'w-10', height: 'h-10' },
};
