import type { Meta, StoryObj } from '@storybook/react';

import ErrorFallback from './index';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSubtitle: '에러가 발생했을 때 보여주는 컴포넌트입니다.',
  },
  argTypes: {
    error: {
      description: '에러 객체로, 에러메세지를 가지고 있습니다.',
      table: {
        type: {
          summary: 'Error',
        },
      },
    },
    hasHomeButton: {
      description: '홈으로 가는 버튼이 있는지 여부입니다.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    resetErrorBoundary: {
      description: '에러를 리셋하는 함수입니다.',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorFallback>;

export const Primary: Story = {
  args: { error: { message: 'Error Message' } },
  parameters: {
    docs: {
      description: {
        story:
          '가장 기본적인 에러 컴포넌트입니다. 일반적인 에러 발생 시 사용합니다.',
      },
    },
  },
};

export const NotFound: Story = {
  args: { error: { message: 'POST_NOT_EXIST' } },
  parameters: {
    docs: {
      description: {
        story:
          '존재하지 않는 게시글을 요청했을 때 보여주는 에러 컴포넌트입니다.',
      },
    },
  },
};
