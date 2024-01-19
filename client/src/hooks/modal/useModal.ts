'use client';

import { useDispatch } from 'react-redux';
import { IModal } from '@/types/redux/IModal';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';

function useModal() {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, message, callback }: IModal) => {
    dispatch(openModal({ type, message, callback: callback || null }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
}

export default useModal;
