import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//react-quill component
import { QuillEditBox } from '@/components';

// form
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  MODAL_TITLE,
  ModalType,
  errorMessage,
  successMessage,
} from '@/constant';

//service
import { boardPost } from '@/service/board-post';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import { useModal } from '@/hooks';

// TODO : title 없을 시 빨간 테두리
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(errorMessage.blankTitle),
});

export default function Write() {
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const { data } = useSession();
  const accessToken = data?.user.token;
  const { openModal } = useModal();

  const handleContent = useCallback((value: string) => setContent(value), []);
  const handleSubmit = useCallback(
    async (title: string, setSubmitting: (isSubmitting: boolean) => void) => {
      if (!accessToken) {
        openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
        return;
      }

      setSubmitting(true);
      await boardPost({ title, content, accessToken });
      setSubmitting(false);
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.postSuccess,
      });
      router.replace('/');
    },
    [content]
  );

  return (
    <div className="bg-gray-50 h-screen">
      {
        <Formik
          initialValues={{ title: '' }}
          validationSchema={ValidationSchema}
          onSubmit={({ title }, { setSubmitting }) =>
            handleSubmit(title, setSubmitting)
          }
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col p-10 m-auto gap-y-5 max-w-5xl pb-20">
              <div className="flex justify-between">
                <Link href="/">
                  <Icon
                    icon="material-symbols:arrow-back-rounded"
                    style={{ fontSize: '30px' }}
                  />
                </Link>
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

              <QuillEditBox content={content} handleContent={handleContent} />
            </Form>
          )}
        </Formik>
      }
    </div>
  );
}
