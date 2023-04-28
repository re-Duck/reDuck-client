import React, { useCallback } from 'react';
import Layout from '@/components/Layout';

import { QuillEditBox } from '@/components';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { errorMessage } from '@/constant';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(errorMessage.blankTitle),
});

export default function Write() {
  const handleSubmit = useCallback(() => {}, []);

  return (
    <Layout>
      <Formik
        initialValues={{ title: '' }}
        validationSchema={ValidationSchema}
        onSubmit={(data, { setSubmitting }) => handleSubmit()}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col shadow-lg p-10 m-auto gap-y-10 min-w-[22rem] max-w-6xl">
            <div className="flex justify-between">
              <button
                className="rounded-md w-15 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                뒤로가기
              </button>
              <button
                className="rounded-md w-15 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                완료
              </button>
            </div>

            <Field
              name="name"
              type="text"
              placeholder="제목을 입력하세요"
              className="text-4xl p-3 border-2 rounded-md border-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent text-slate-600"
            />
            <QuillEditBox />
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
