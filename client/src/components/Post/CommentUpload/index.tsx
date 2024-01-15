'use client';

//core
import React from 'react';
import { useSearchParams } from 'next/navigation';

//components
import Avatar from '../../Avatar';

//service
import { BASE_URL } from '@/service/base/api';
import { commentManager } from '@/service/comment';

//assets
import { ModalType, errorMessage } from '@/constants/constant';
import useModal from '@/hooks/modal/useModal';

//form
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

//types
import { IUserState } from '@/types/redux/IUserState';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IComentUpload {
  user: IUserState;
}

interface IHnadlerComment {
  content: string;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

const ValidationSchema = Yup.object().shape({
  content: Yup.string().required(errorMessage.blankTitle),
});

export default function CommentUpload({ user }: IComentUpload) {
  const params = useSearchParams();
  const postOriginId = params.get('id') as string;

  const { openModal } = useModal();
  const comentImgSrc = user ? `${BASE_URL}${user.userProfileImgPath}` : '';

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (content: string) =>
      commentManager.createComment({ content, postOriginId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [postOriginId] }),
  });

  const handleComment = async ({
    content,
    setSubmitting,
    resetForm,
  }: IHnadlerComment) => {
    if (user === undefined) {
      openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
      setSubmitting(false);
      return;
    }
    mutate(content, {
      onSuccess: () => {
        resetForm();
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
      },
      onError: () =>
        openModal({ type: ModalType.ERROR, message: errorMessage.tryAgain }),
    });
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ content: '' }}
      validationSchema={ValidationSchema}
      onSubmit={({ content }, { setSubmitting, resetForm }) =>
        handleComment({ content, setSubmitting, resetForm })
      }
    >
      {({ errors, isSubmitting }) => (
        <Form className="flex justify-between items-center sm:gap-0.5 h-16 bg-white border-gray-100 border-[1px] sm:px-10">
          <Avatar src={comentImgSrc} alt="user_icon" size="sm" />
          <Field
            name="content"
            type="text"
            className=" border-b-gray-200 border-b-[1px] p-2 pl-3 w-8/12"
            placeholder="댓글을 입력해 보세요."
          />
          <button
            className="px-3 py-2 text-xs text-white bg-red-400 rounded-lg "
            type="submit"
            onClick={() => {
              errors.content &&
                openModal({
                  type: ModalType.ERROR,
                  message: errors.content,
                });
            }}
            disabled={isSubmitting}
          >
            등록
          </button>
        </Form>
      )}
    </Formik>
  );
}