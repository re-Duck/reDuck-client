/* eslint-disable @typescript-eslint/no-empty-function */
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../lib/redux/slices/modalSlice';

function useModal() {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, message, callback = null }: any) => {
    dispatch(openModal({ type, message, callback }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
}

export default useModal;
