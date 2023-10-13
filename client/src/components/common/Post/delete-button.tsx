import React from 'react';
import { useRouter } from 'next/router';

import { useModal } from '@/hooks';
import {
  ModalType,
  successMessage,
  warningMessage,
} from '@/constants/constant';

//service
import { deleteCommtent } from '@/service/delete-comment';
import { errorMessage } from '@/constants/constant';
import { postManager } from '@/service/post';

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

  const callback = async () => {
    if (type === 'post') {
      await postManager.deletePost({ token, postOriginId: id });

      router.push('/');
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.postDeleteSuccess,
      });
    } else if (type === 'comment') {
      await deleteCommtent({
        token,
        commentOriginId: id,
        callback: () =>
          openModal({
            type: ModalType.ERROR,
            message: errorMessage.error,
          }),
      });
      refetch && refetch();
    }
  };
  return (
    <button
      onClick={() =>
        openModal({
          type: ModalType.WARNING,
          message: IS_CHECK_MODAL_MESSAGE,
          callback: () => callback(),
        })
      }
    >
      삭제
    </button>
  );
}
