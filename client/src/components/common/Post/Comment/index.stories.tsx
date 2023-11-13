import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Comment from './index';
import { IComment } from '@/types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const mockComment: IComment = {
  commentAuthorDevelopAnnual: '0',
  commentAuthorId: 'test1234',
  commentAuthorName: '테스터',
  commentAuthorProfileImgPath:
    '/home/nuhgnod/develup/storage/profile/test1234/325560ce-a9fa-4194-95cb-5590b8e24052.jpg',
  commentContent: '스토리북 좋아요!',
  commentCreatedAt: '2023-10-09T22:39:43.959916',
  commentOriginId: '058acda2-c75b-4541-b7b3-645e3dbe5f3a',
  commentUpdatedAt: '2023-10-09T22:39:43.959916',
};

const meta: Meta<typeof Comment> = {
  title: 'Components/common/Post/Comment',
  component: Comment,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '게시글의 댓글을 보여주는 컴포넌트입니다.',
  },
  decorators: [
    (Story) => (
      <Provider
        store={configureStore({
          reducer: {},
        })}
      >
        <div className="w-screen max-w-4xl">
          <Story />
        </div>
      </Provider>
    ),
  ],
  argTypes: {
    data: {
      description: '댓글의 정보를 담고 있는 객체입니다.',
    },
    IS_AUTHOR: {
      description: '댓글의 작성자인지 여부를 나타내는 boolean 값입니다.',
    },
    postOriginId: {
      description: '댓글이 속한 게시글의 고유 아이디입니다.',
    },
    refetch: {
      description:
        '새로운 댓글 리스트를 불러오는 react-query 함수입니다. 댓글을 수정하거나 삭제한 후에 실행합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Primary: Story = {
  args: { data: mockComment, IS_AUTHOR: false, postOriginId: '' },
  parameters: {
    docs: {
      description: {
        story: '작성자가 아닌 경우의 댓글을 보여주는 컴포넌트 입니다.',
      },
    },
  },
};

export const MyComment: Story = {
  args: { data: mockComment, IS_AUTHOR: true, postOriginId: '' },
  parameters: {
    docs: {
      description: {
        story:
          '작성자인 경우의 댓글을 보여주는 컴포넌트 입니다. 수정 및 삭제 버튼이 보여집니다.',
      },
    },
  },
};
