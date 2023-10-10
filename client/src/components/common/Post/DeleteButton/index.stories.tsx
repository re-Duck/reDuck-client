import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DeleteButton from './index';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const meta: Meta<typeof DeleteButton> = {
  title: 'Components/Post/DeleteButton',
  component: DeleteButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '게시글의 댓글을 작성하는 컴포넌트입니다.',
  },

  decorators: [
    (Story) => (
      <Provider
        store={configureStore({
          reducer: {},
        })}
      >
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Primary: Story = {
  args: { id: 'test1234', token: '', type: 'comment' },
};
