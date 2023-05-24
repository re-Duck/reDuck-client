import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../store/modalSlice';

function useModal() {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, props }: any) => {
    dispatch(openModal({ type, props }));
  };

  const handleCloseModal = (type: any) => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
}

export default useModal;
