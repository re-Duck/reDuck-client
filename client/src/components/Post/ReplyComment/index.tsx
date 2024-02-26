'use client';

import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//components
import { Button } from '@/components';

//hooks
import useModal from '@/hooks/modal/useModal';

//services
import { commentManager } from '@/service/comment';

//form
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

//constants
import { ModalType, errorMessage } from '@/constants/constant';

// types
import { IReduxState } from '@/types/redux/IReduxState';

interface IProps {
  onClose: () => void;
  parentCommentOriginId: string;
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

export default function ReplyComment({
  onClose,
  parentCommentOriginId,
  postOriginId,
}: IProps) {
  const { openModal } = useModal();
  const user = useSelector((state: IReduxState) => state.auth);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (content: string) =>
      commentManager.createReply({
        content,
        parentCommentOriginId,
        postOriginId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [`${postOriginId}/comment`] }),
  });

  const handleReply = ({
    content,
    setSubmitting,
    resetForm,
  }: IHnadlerComment) => {
    if (user.userId === '') {
      openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
      setSubmitting(false);
      return;
    }
    mutate(content, {
      onSuccess: () => {
        resetForm();
        onClose();
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
        handleReply({ content, setSubmitting, resetForm })
      }
    >
      {({ errors, values, isSubmitting }) => (
        <Form className="pt-3 mt-5 border-t border-blue-gray-scale-50">
          <div className="p-3 mb-2 border border-gray-scale-500 h-[60px]">
            <Field
              name="content"
              type="text"
              className="w-full text-sm focus:outline-none"
              placeholder="답글을 작성해 주세요 (@를 입력하여 다른 사람을 태그할 수 있습니다)"
            />
          </div>
          <div className="justify-end flex gap-[20px] items-center">
            <span className="hover:cursor-pointer" onClick={onClose}>
              취소
            </span>
            <Button
              type="submit"
              color="blue_gray"
              onClick={() => {
                errors.content &&
                  openModal({
                    type: ModalType.ERROR,
                    message: errors.content,
                  });
              }}
              disabled={values.content.length === 0 || isSubmitting}
            >
              답글 작성
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
