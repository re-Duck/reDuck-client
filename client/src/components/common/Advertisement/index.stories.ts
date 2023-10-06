import type { Meta, StoryObj } from '@storybook/react';

import Advertisement from './index';

const meta: Meta<typeof Advertisement> = {
  title: 'Components/Advertisement',
  component: Advertisement,
};

export default meta;
type Story = StoryObj<typeof Advertisement>;

export const Primary: Story = {
  args: {},
};
