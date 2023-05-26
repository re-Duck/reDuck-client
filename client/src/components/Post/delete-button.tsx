import { ModalType, successMessage, warningMessage } from '@/constant';
import { useModal } from '@/hooks';
import { deleteCommtent } from '@/service/delete-comment';
import { deletePost } from '@/service/delete-post';
import { useRouter } from 'next/router';
import React from 'react';

export default function DeleteButton({ id, token, type }: any) {
  const { openModal } = useModal();

  const router = useRouter();
  const IS_CHECK_MODAL_MESSAGE =
    type === 'post'
      ? warningMessage.confirmDeletePost
      : warningMessage.confirmDeleteComment;

  const callback = () => {
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
      deleteCommtent({
        token,
        commentOriginId: id,
        callback: () =>
          openModal({
            type: ModalType.SUCCESS,
            message: successMessage.commentDeleteSuccess,
          }),
      });
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
