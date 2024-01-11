import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import CommentUpload from './index';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IUserState } from '@/types/redux/IUserState';

const mockUser: IUserState = {
  userId: 'test1234',
  userName: '테스터',
  userProfileImgPath:
    '/home/nuhgnod/develup/storage/profile/test1234/325560ce-a9fa-4194-95cb-5590b8e24052.jpg',
};

const meta: Meta<typeof CommentUpload> = {
  title: 'Components/common/Post/CommentUpload',
  component: CommentUpload,
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
type Story = StoryObj<typeof CommentUpload>;

export const Primary: Story = {
  args: {},
};

export const Logined: Story = {
  args: { user: mockUser },
};
