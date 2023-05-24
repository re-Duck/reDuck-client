import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../lib/redux/slices/modalSlice';

function useModal() {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, message }: any) => {
    dispatch(openModal({ type, message }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
}

export default useModal;
