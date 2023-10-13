import React from 'react';

import { useModal } from '@/hooks';
import { ModalType, successMessage } from '@/constants/constant';

import { commentManager } from '../../../service/comment/index';

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
    await commentManager.updateCommtent({
      token,
      postOriginId,
      content: comment,
      commentOriginId: id,
    });

    openModal({
      type: ModalType.SUCCESS,
      message: successMessage.commentUpdateSuccess,
    });
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
    >
      {isModifying ? '완료' : '수정'}
    </button>
  );
}
