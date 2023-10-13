import React from 'react';
import { useRouter } from 'next/router';

import { useModal } from '@/hooks';
import {
  ModalType,
  errorMessage,
  successMessage,
  warningMessage,
} from '@/constants/constant';

//service
import { postManager } from '@/service/post';
import { commentManager } from '../../../service/comment/index';

interface IDeleteButton {
  id: string;
  token: string;
  type: 'comment' | 'post';
  refetch?: () => void;
}

export default function DeleteButton({
  id,
  token,
  type,
  refetch,
}: IDeleteButton) {
  const { openModal } = useModal();
  const router = useRouter();
  const IS_CHECK_MODAL_MESSAGE =
    type === 'post'
      ? warningMessage.confirmDeletePost
      : warningMessage.confirmDeleteComment;

  const handdleDelete = async () => {
    try {
      if (type === 'post') {
        await postManager.deletePost({ token, postOriginId: id });

        router.push('/');
        openModal({
          type: ModalType.SUCCESS,
          message: successMessage.postDeleteSuccess,
        });
      } else if (type === 'comment') {
        await commentManager.deleteCommtent({
          token,
          commentOriginId: id,
        });
        refetch && refetch();
      }
    } catch (e) {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
      });
    }
  };
  return (
    <button
      onClick={() =>
        openModal({
          type: ModalType.WARNING,
          message: IS_CHECK_MODAL_MESSAGE,
          callback: handdleDelete,
        })
      }
    >
      삭제
    </button>
  );
}
