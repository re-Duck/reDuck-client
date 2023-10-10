/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';

import PostBox from './index';

const url = `${process.env.NEXT_PUBLIC_API_URL}/post?postOriginId=&postType=stack%2Cqna&page=10`;
const mockPostsData = [
  {
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
  },
];

const meta: Meta<typeof PostBox> = {
  title: 'Components/home/PostBox',
  component: PostBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle:
      '메인 페이지에서 보여지는 게시글 요약 컴포넌트들을 담고 있는 컴포넌트입니다.',
    msw: {
      handlers: [
        rest.get(url, (req, res, ctx) => {
          return res(ctx.json(mockPostsData));
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostBox>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '한번에 10개의 데이터를 받아오고, 맨 아래로 스크롤 시 다음 게시글을 요청합니다.',
      },
    },
  },
};
