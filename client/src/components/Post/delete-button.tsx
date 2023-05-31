import React from 'react';
import { useRouter } from 'next/router';

import { useModal } from '@/hooks';
import { ModalType, successMessage, warningMessage } from '@/constant';

//service
import { deleteCommtent } from '@/service/delete-comment';
import { deletePost } from '@/service/delete-post';

interface IProps {
  id: string;
  token: string;
  type: string;
  refetch: () => void;
}

export default function DeleteButton({ id, token, type, refetch }: IProps) {
  const { openModal } = useModal();
  const router = useRouter();
  const IS_CHECK_MODAL_MESSAGE =
    type === 'post'
      ? warningMessage.confirmDeletePost
      : warningMessage.confirmDeleteComment;

  const callback = async () => {
    if (type === 'post') {
      deletePost({
        token,
        postOriginId: id,
        callback: () => {
          router.push('/');
          openModal({
            type: ModalType.SUCCESS,
            message: successMessage.postDeleteSuccess,
          });
        },
      });
    } else if (type === 'comment') {
      await deleteCommtent({
        token,
        commentOriginId: id,
        callback: () =>
          openModal({
            type: ModalType.SUCCESS,
            message: successMessage.commentDeleteSuccess,
          }),
      });
      refetch();
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
