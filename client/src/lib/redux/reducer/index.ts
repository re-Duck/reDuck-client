import { PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { modalSlice } from '../slices/modalSlice';
import { alertSlice } from '../slices/alertSlice';

export const reducer = (state: any, action: PayloadAction) => {
  return combineReducers({
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    alert: alertSlice.reducer,
  })(state, action);
};
