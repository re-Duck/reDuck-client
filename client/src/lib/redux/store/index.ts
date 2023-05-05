import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../reducer';

const makeStore = () =>
  configureStore({
    reducer,
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
