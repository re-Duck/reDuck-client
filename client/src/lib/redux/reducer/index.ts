import { PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { modalSlice } from '../slices/modalSlice';
import { IReduxState } from '@/types/redux/IReduxState';

export const reducer = (state: IReduxState, action: PayloadAction) => {
  return combineReducers({
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
  })(state, action);
};
