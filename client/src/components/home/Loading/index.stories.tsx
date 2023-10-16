/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react';

import Loading from './index';

const meta: Meta<typeof Loading> = {
  title: 'Components/home/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '메인 페이지 로딩 시 보여지는 로딩 컴포넌트입니다.',
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Primary: Story = {};
