// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// hooks
import useModal from '@/hooks/modal/useModal';

// constant
import { ModalType, warningMessage, errorMessage } from '@/constants/constant';

// services
import { commentManager } from '@/service/comment';

interface IDeleteComment {
  commentOriginId: string;
  postOriginId: string;
}

export default function DeleteComment({
  commentOriginId,
  postOriginId,
}: IDeleteComment) {
  const { openModal } = useModal();

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: () =>
      commentManager.deleteComment({
        commentOriginId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`${postOriginId}/comment`] }),
    onError: () =>
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
      }),
  });

  const handleClickDelete = () => {
    openModal({
      type: ModalType.WARNING,
      message: warningMessage.confirmDeleteComment,
      callback: () => {
        commentMutation.mutate();
      },
    });
  };

  return (
    <span
      className="hover:underline hover:cursor-pointer"
      onClick={handleClickDelete}
    >
      삭제
    </span>
  );
}
