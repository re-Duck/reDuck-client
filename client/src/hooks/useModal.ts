import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../lib/redux/slices/modalSlice';
import { IModal } from '@/types/redux/IModal';

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
