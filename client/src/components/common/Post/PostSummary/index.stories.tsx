import type { Meta, StoryObj } from '@storybook/react';
import PostSummary from './index';

import { IPostInformation } from '@/types';

const mockPostInfoData: IPostInformation = {
  commentsCount: 1,
  postAuthorDevelopAnnual: '0',
  postAuthorId: 'reduck',
  postAuthorName: '운영자',
  postAuthorProfileImgPath:
    '/home/nuhgnod/develup/storage/profile/reduck/ef97d2eb-9e89-4dae-a0df-6e932666fae3.png',
  postContent: '<p>reDuck입니다. 환영합니다!!</p>',
  postCreatedAt: '2023-05-24T15:18:16.274302',
  postOriginId: 'd653a9eb-3ff0-4ae4-9ce0-22b1e294f321',
  postTitle: 'reDuck 입니다.',
  postType: 'qna',
  postUpdatedAt: '2023-06-01T02:25:31.176242',
};

const meta: Meta<typeof PostSummary> = {
  title: 'Components/Post/PostSummary',
  component: PostSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '메인 페이지에서 보여지는 게시글 요약 컴포넌트입니다.',
  },
  argTypes: {
    postInfoData: {
      description: '서버에서 받아온 게시글의 정보를 담고 있는 객체입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostSummary>;

export const Primary: Story = {
  args: { postInfoData: mockPostInfoData },
};
