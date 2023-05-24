import { ModalType } from '@/constant';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: ModalType.CLOSE,
  message: '',
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
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
