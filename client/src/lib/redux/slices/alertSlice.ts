import { AlertType } from '@/constants/constant';
import { IAlert } from '@/types/redux/IAlert';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: AlertType.CLOSE,
  message: '',
};

export const alertSelector = ({ alert }: { alert: IAlert }) => alert;

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openAlert: (state, action) => {
      const { type, message } = action.payload;
      state.type = type;
      state.message = message;
    },
    closeAlert: () => {
      return initialState;
    },
  },
});

export const { openAlert, closeAlert } = alertSlice.actions;
