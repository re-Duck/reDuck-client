'use client';

import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/features/alert/alertSlice';

import { AlertType } from '@/constants/constant';
import { successMessage, errorMessage } from '@/constants/constant';

function useCopyClipBoard() {
  const dispatch = useDispatch();

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.href}`);
      dispatch(
        openAlert({
          type: AlertType.SUCCESS,
          message: successMessage.copylinkSuccess,
        })
      );
    } catch {
      dispatch(
        openAlert({
          type: AlertType.ERROR,
          message: errorMessage.tryAgain,
        })
      );
    }
  };

  return onCopy;
}

export default useCopyClipBoard;
