import { PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { modalSlice } from '../slices/modalSlice';

export const reducer = (state: any, action: PayloadAction) => {
  return combineReducers({
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
  })(state, action);
};
