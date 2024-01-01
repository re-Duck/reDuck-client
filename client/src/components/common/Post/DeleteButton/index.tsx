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
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IDeleteButton {
  id: string;
  type: 'comment' | 'post';
  postOriginId: string;
}

export default function DeleteButton({
  id,
  type,
  postOriginId,
}: IDeleteButton) {
  const { openModal } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const postMutation = useMutation({
    mutationFn: (id: string) => postManager.deletePost({ postOriginId: id }),
    onSuccess: () => {
      router.push('/');
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.postDeleteSuccess,
      });
    },
    onError: () =>
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
      }),
  });
  const commentMutation = useMutation({
    mutationFn: (id: string) =>
      commentManager.deleteComment({
        commentOriginId: id,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [postOriginId] }),
    onError: () =>
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
      }),
  });

  const IS_CHECK_MODAL_MESSAGE =
    type === 'post'
      ? warningMessage.confirmDeletePost
      : warningMessage.confirmDeleteComment;

  const handdleDelete = async () => {
    if (type === 'post') {
      postMutation.mutate(id);
    } else if (type === 'comment') {
      commentMutation.mutate(id);
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
