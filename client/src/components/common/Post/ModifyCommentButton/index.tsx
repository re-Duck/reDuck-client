import React from 'react';

import { useModal } from '@/hooks';
import { ModalType, errorMessage, successMessage } from '@/constants/constant';
import { commentManager } from '@/service/comment';

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
    try {
      await commentManager.updateComment({
        token,
        postOriginId,
        content: comment,
        commentOriginId: id,
      });

      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.commentUpdateSuccess,
      });
    } catch (e) {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
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
      className="font-normal text-gray-400"
    >
      {isModifying ? '완료' : '수정'}
    </button>
  );
}
