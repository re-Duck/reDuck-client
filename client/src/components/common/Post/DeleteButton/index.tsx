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
import { commentManager } from '@/service/comment';

interface IDeleteButton {
  id: string;
  type: 'comment' | 'post';
  refetch?: () => void;
}

export default function DeleteButton({ id, type, refetch }: IDeleteButton) {
  const { openModal } = useModal();
  const router = useRouter();
  const IS_CHECK_MODAL_MESSAGE =
    type === 'post'
      ? warningMessage.confirmDeletePost
      : warningMessage.confirmDeleteComment;

  const handdleDelete = async () => {
    try {
      if (type === 'post') {
        await postManager.deletePost({ postOriginId: id });

        router.push('/');
        openModal({
          type: ModalType.SUCCESS,
          message: successMessage.postDeleteSuccess,
        });
      } else if (type === 'comment') {
        await commentManager.deleteComment({
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
      className="font-normal text-gray-400"
    >
      삭제
    </button>
  );
}
