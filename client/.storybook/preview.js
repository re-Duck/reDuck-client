import React from 'react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import '../src/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

initialize();
const queryClient = new QueryClient();
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    mswDecorator,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;
