import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MenuView from './index';

import { useDispatch } from 'react-redux';
import { authSlice } from '../../../.storybook/preview';

const meta: Meta<typeof MenuView> = {
  title: 'Components/common/MenuView',
  component: MenuView,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
    componentSubtitle:
      '햄버거 버튼을 클릭했을 때 보여주는 메뉴 리스트 컴포넌트입니다. ',
    docs: {
      description: {
        component:
          '- 이 컴포넌트는 **모바일 화면 사이즈**에서만 보여집니다.\n- 현재 fixed 속성때문에 **Docs에서는 정상적으로 보이지 않습니다.**',
      },
    },
  },
  argTypes: {
    isClickedHamburger: {
      description: '햄버거 버튼이 클릭되었는지 여부입니다.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
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
type Story = StoryObj<typeof MenuView>;

export const Primary: Story = {
  args: {
    isClickedHamburger: true,
    hasLoginButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**비로그인 시** 보여지는 메뉴 리스트 컴포넌트입니다.',
      },
    },
  },
};
export const Logined: Story = {
  args: {
    isClickedHamburger: true,
    hasLoginButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**로그인 시** 보여지는 메뉴 리스트 컴포넌트입니다.',
      },
    },
  },

  decorators: [
    (Story) => {
      const dispatch = useDispatch();
      dispatch(
        authSlice.actions.logIn({
          userId: 'userId',
          userName: 'userName',
          userProfileImgPath: '',
          isLogin: true,
        })
      );
      return <Story />;
    },
  ],
};
