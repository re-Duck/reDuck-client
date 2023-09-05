/* eslint-disable @typescript-eslint/no-empty-function */
import { ModalType } from '@/constants/constant';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: ModalType.CLOSE,
  message: '',
  callback: null,
};

export const modalSelector = (state: any) => state.modal;

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, message } = action.payload;
      state.type = type;
      state.message = message;
      state.callback = action.payload.callback;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
