import React from 'react';
import { useRouter } from 'next/router';

import { useModal } from '@/hooks';
import { ModalType, successMessage } from '@/constant';

//service
import { deleteCommtent } from '@/service/delete-comment';
import { deletePost } from '@/service/delete-post';

export default function ModifyButton({
  id,
  token,
  type,
  refetch,
  isModifying,
  setIsModifying,
}: any) {
  const { openModal } = useModal();
  const router = useRouter();
  const IS_CHECK_MODAL_MESSAGE =
    type === 'post'
      ? successMessage.postUpdateSuccess
      : successMessage.commentUpdateSuccess;

  const handleUpdate = async () => {};
  // const callback = async () => {
  //   if (type === 'post') {
  //     deletePost({
  //       token,
  //       postOriginId: id,
  //       callback: () => {
  //         router.push('/');
  //         openModal({
  //           type: ModalType.SUCCESS,
  //           message: successMessage.postDeleteSuccess,
  //         });
  //       },
  //     });
  //   } else if (type === 'comment') {
  //     await deleteCommtent({
  //       token,
  //       commentOriginId: id,
  //       callback: () =>
  //         openModal({
  //           type: ModalType.SUCCESS,
  //           message: successMessage.commentDeleteSuccess,
  //         }),
  //     });
  //     refetch();
  //   }
  // };
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
