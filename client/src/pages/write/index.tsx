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
import { boardPost } from '@/service/board-post';
import { boardUpdate } from '@/service/board-update';
import { Icon } from '@iconify/react';

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
      if (!accessToken) {
        openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
        return;
      }

      setSubmitting(true);
      let returnPostOriginId = postOriginId;

      if (returnPostOriginId) {
        await boardUpdate({ title, content, accessToken, postOriginId });
      } else {
        returnPostOriginId = await boardPost({ title, content, accessToken });
      }

      setSubmitting(false);
      router.replace(`/board/${returnPostOriginId}`);
    },
    [content]
  );

  useEffect(() => {
    if (!postOriginId && initTitle === '') return;
    getPostData();
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
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
            <Form className="flex flex-col p-10 m-auto gap-y-5 max-w-5xl">
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
                  className="rounded-md w-15 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
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
                className="text-4xl p-3 border-2 rounded-md border-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-transparent text-slate-700 bg-transparent"
              />
              <div className="border-2">
                <QuillEditBox content={content} handleContent={handleContent} />
              </div>
            </Form>
          )}
        </Formik>
      }
    </div>
  );
}
