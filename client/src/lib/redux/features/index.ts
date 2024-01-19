import { PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { modalSlice } from './modal/modalSlice';
import { alertSlice } from './alert/alertSlice';

export const reducer = (state: any, action: PayloadAction) => {
  return combineReducers({
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    alert: alertSlice.reducer,
  })(state, action);
};
