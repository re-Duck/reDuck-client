import type { Meta, StoryObj } from '@storybook/react';
import PostDetail from './index';

import { IPostInformation } from '@/types';

const mockPostInfoData: IPostInformation = {
  commentsCount: 1,
  postAuthorDevelopAnnual: '0',
  postAuthorId: 'reduck',
  postAuthorName: '운영자',
  postAuthorProfileImgPath:
    '/home/nuhgnod/develup/storage/profile/reduck/ef97d2eb-9e89-4dae-a0df-6e932666fae3.png',
  postContent: `<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>`,
  postCreatedAt: '2023-05-24T15:18:16.274302',
  postOriginId: 'd653a9eb-3ff0-4ae4-9ce0-22b1e294f321',
  postTitle: 'Test Post',
  postType: 'qna',
  postUpdatedAt: '2023-06-01T02:25:31.176242',
};

const meta: Meta<typeof PostDetail> = {
  title: 'Components/board/PostDetail',
  component: PostDetail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '상세 게시글에서 보여지는 게시글 내용 컴포넌트입니다.',
  },
  argTypes: {
    data: {
      description: '서버에서 받아온 게시글의 정보를 담고 있는 객체입니다.',
    },
    IS_AUTHOR: {
      description:
        '게시글 작성자인지 여부를 나타내는 boolean 값입니다. 작성자는 수정 및 삭제를 할 수 있습니다.',
    },
    token: {
      description: '로그인한 사용자의 토큰 값입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostDetail>;

export const Primary: Story = {
  args: { data: mockPostInfoData, IS_AUTHOR: false },
};

export const AuthorPost: Story = {
  args: { data: mockPostInfoData, IS_AUTHOR: true },
};
