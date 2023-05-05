import { PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';

export const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    auth: authSlice.reducer,
  })(state, action);
};
