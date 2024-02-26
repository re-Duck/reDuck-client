/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import WritePostButton from './index';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

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

const meta: Meta<typeof WritePostButton> = {
  title: 'Components/home/WritePostButton',
  component: WritePostButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      '메인 페이지에서 보여지는 게시글 작성 버튼 컴포넌트입니다.',
  },
  decorators: [
    (Story) => (
      <Provider
        store={configureStore({
          reducer: {},
        })}
      >
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WritePostButton>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: '**비로그인 시** 보여지는 게시글 작성 버튼 컴포넌트입니다.',
      },
    },
  },
};

export const LoggedIn: Story = {
  parameters: {
    docs: {
      description: {
        story: '**로그인 시** 보여지는 게시글 작성 버튼 컴포넌트입니다.',
      },
    },
    nextAuthMock: {
      session: {
        ...mockData,
      },
    },
  },
};
