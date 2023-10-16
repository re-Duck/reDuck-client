import React from 'react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import '../src/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

initialize();
const queryClient = new QueryClient();

const initialState = {
  userId: '',
  userName: '',
  userProfileImgPath: '',
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, actions) => {
      state.userId = actions.payload.userId;
      state.userName = actions.payload.userName;
      state.userProfileImgPath = actions.payload.userProfileImgPath;
      state.isLogin = true;
    },
  },
});

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
      <Provider
        store={configureStore({
          reducer: {
            auth: authSlice.reducer,
          },
        })}
      >
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </Provider>
    ),
  ],
};

export default preview;
