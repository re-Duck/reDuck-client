import type { Meta, StoryObj } from '@storybook/react';

import Navigator from './index';

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

const meta: Meta<typeof Navigator> = {
  title: 'Components/common/Navigator',
  component: Navigator,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '상단에 고정되어 있는 네비게이션 컴포넌트입니다.',
    docs: {
      description: {
        component:
          '- 현재 fixed 속성때문에 **Docs에서는 정상적으로 보이지 않습니다.**',
      },
    },
  },
  args: {
    hasLoginButton: true,
  },
  argTypes: {
    hasLoginButton: {
      description: '로그인 버튼이 보여지는지 여부입니다.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    setisClickedHamburger: {
      description: '햄버거 버튼 클릭 여부를 설정하는 함수입니다.',
      table: {
        type: {
          summary: 'React.Dispatch<React.SetStateAction<boolean>>',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navigator>;

export const Primary: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '**비로그인 시** 보여지는 네비게이션 컴포넌트입니다.',
      },
    },
  },
};
export const Logined: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '**로그인 시** 보여지는 네비게이션 컴포넌트입니다.',
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
        story: '**모바일 화면**에서 보여지는 네비게이션 컴포넌트입니다.',
      },
    },
  },
};
