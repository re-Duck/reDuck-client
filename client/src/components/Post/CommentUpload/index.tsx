'use client';

//core
import React from 'react';

//components
import { Button, Avatar } from '@/components';

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
  postOriginId: string;
}

interface IHnadlerComment {
  content: string;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

const ValidationSchema = Yup.object().shape({
  content: Yup.string().required(errorMessage.blankTitle),
});

export default function CommentUpload({ user, postOriginId }: IComentUpload) {
  const { openModal } = useModal();
  const comentImgSrc = user ? `${BASE_URL}${user.userProfileImgPath}` : '';

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (content: string) =>
      commentManager.createComment({ content, postOriginId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`${postOriginId}/comment`] }),
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
      {({ errors, values, isSubmitting }) => (
        <Form className="border-b border-b-blue-gray-scale-50">
          <div className="px-5 py-3 border border-gray-scale-400 h-[90px]">
            <div className="flex items-center gap-1 mb-1">
              <Avatar src={comentImgSrc} alt="user_icon" size="xxs" />
              <span className="text-caption1">
                {user.userName !== '' ? user.userName : '로그인이 필요합니다'}
              </span>
            </div>
            <Field
              name="content"
              type="text"
              className="w-full text-body3 focus:outline-none placeholder:text-gray-scale-500"
              placeholder="댓글을 작성해주세요. (@를 입력하여 다른 사람을 태그할 수 있습니다)"
            />
          </div>
          <div className="flex justify-end mt-5 mb-10">
            <Button
              color="blue_gray"
              type="submit"
              onClick={() => {
                errors.content &&
                  openModal({
                    type: ModalType.ERROR,
                    message: errors.content,
                  });
              }}
              disabled={values.content.length === 0 || isSubmitting}
            >
              댓글 작성
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
