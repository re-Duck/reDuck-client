import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { modalSlice } from './modalSlice';

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
