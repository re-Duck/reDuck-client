import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

//react-quill component
import { QuillEditBox } from '@/components';

// form
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ModalType, errorMessage, warningMessage } from '@/constants/constant';

//hooks
import { useModal, useWriting } from '@/hooks';
import { useSession } from 'next-auth/react';

//service
import { Icon } from '@iconify/react';
import { postManager } from '@/service/post';
import Tiptap from '@/components/write/Tiptap';

// TODO : title 없을 시 빨간 테두리
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(errorMessage.blankTitle),
});

export default function Write() {
  const router = useRouter();
  const postOriginId = router.query.postOriginId as string;

  const { initTitle, content, getPostData, handleContent } =
    useWriting(postOriginId);

  const { data } = useSession();
  const accessToken = data?.user.token;
  const { openModal, closeModal } = useModal();

  const handleSubmit = useCallback(
    async (title: string, setSubmitting: (isSubmitting: boolean) => void) => {
      try {
        if (!accessToken) {
          openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
          return;
        }

        setSubmitting(true);
        let returnPostOriginId = postOriginId;

        if (returnPostOriginId) {
          await postManager.updatePost({
            title,
            content,
            accessToken,
            postOriginId,
          });
        } else {
          returnPostOriginId = await postManager.createPost({
            title,
            content,
            accessToken,
          });
        }

        setSubmitting(false);
        router.replace(`/board/${returnPostOriginId}`);
      } catch (e) {
        setSubmitting(false);
        openModal({ type: ModalType.ERROR, message: errorMessage.tryAgain });
      }
    },
    [content]
  );

  useEffect(() => {
    if (!postOriginId && initTitle === '') return;
    getPostData();
  }, []);

  return (
    <div className="h-screen bg-gray-50">
      {
        <Formik
          enableReinitialize={true}
          initialValues={{ title: initTitle }}
          validationSchema={ValidationSchema}
          onSubmit={({ title }, { setSubmitting }) =>
            handleSubmit(title, setSubmitting)
          }
        >
          {({ errors, isSubmitting }) => (
            <Form className="flex flex-col max-w-5xl p-10 m-auto gap-y-5">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() =>
                    openModal({
                      type: ModalType.WARNING,
                      message: warningMessage.confirmGoOut,
                      callback: () => {
                        closeModal();
                        router.push(
                          postOriginId ? `board/${postOriginId}` : '/'
                        );
                      },
                    })
                  }
                >
                  <Icon
                    icon="material-symbols:arrow-back-rounded"
                    style={{ fontSize: '30px' }}
                  />
                </button>

                <button
                  className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md w-15 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    errors.title &&
                      openModal({
                        type: ModalType.ERROR,
                        message: errors.title,
                      });
                  }}
                >
                  완료
                </button>
              </div>
              <Field
                name="title"
                type="text"
                placeholder="제목을 입력하세요"
                className="p-3 text-4xl bg-transparent border-2 border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-transparent text-slate-700"
              />
              <Tiptap />
            </Form>
          )}
        </Formik>
      }
    </div>
  );
}
