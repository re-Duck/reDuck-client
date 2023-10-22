import React from 'react';

import { useModal } from '@/hooks';
import { ModalType, errorMessage, successMessage } from '@/constants/constant';

import { updateCommtent } from '@/service/update-comment';

interface IProps {
  id: string;
  token: string;
  comment: string;
  isModifying: boolean;
  setIsModifying: (isModifying: boolean) => void;
  postOriginId: string;
}
export default function ModifyCommentButton({
  id,
  token,
  comment,
  isModifying,
  setIsModifying,
  postOriginId,
}: IProps) {
  const { openModal } = useModal();

  const handleUpdate = async () => {
    const res = await updateCommtent({
      token,
      postOriginId,
      content: comment,
      commentOriginId: id,
    });

    if (res) {
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.commentUpdateSuccess,
      });
    } else {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.error,
      });
    }
  };
  return (
    <button
      onClick={() => {
        if (isModifying) {
          handleUpdate();
          setIsModifying(false);
        } else {
          setIsModifying(true);
        }
      }}
      className="font-medium text-gray-400"
    >
      {isModifying ? '완료' : '수정'}
    </button>
  );
}
