import type { Meta, StoryObj } from '@storybook/react';

import Layout from './index';

const mockData = {
  data: {
    user: {
      id: 'reduck',
      userProfileImgPath:
        '/home/nuhgnod/develup/storage/profile/reduck/ef97d2eb-9e89-4dae-a0df-6e932666fae3.png',
      token: 'token',
    },
  },
};

const meta: Meta<typeof Layout> = {
  title: 'Components/base/Layout',
  component: Layout,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      '모든 페이지에서 공통적으로 보여지는 레이아웃 컴포넌트입니다.',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Primary: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '**비로그인 시** 보여지는 레이아웃 컴포넌트입니다.',
      },
    },
  },
};
export const Logined: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '**로그인 시** 보여지는 레이아웃 컴포넌트입니다.',
      },
    },
    nextAuthMock: {
      session: {
        ...mockData,
      },
    },
  },
};

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: '**모바일 화면**에서 보여지는 레이아웃 컴포넌트입니다.',
      },
    },
  },
};
