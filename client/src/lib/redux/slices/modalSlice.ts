import { ModalType } from '@/constants/constant';
import { IModal } from '@/types/redux/IModal';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IModal = {
  type: ModalType.CLOSE,
  message: '',
  callback: null,
};

export const modalSelector = ({ modal }: { modal: IModal }) => modal;

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => Object.assign(state, action.payload),
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
