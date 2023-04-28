import React, { useCallback, useState } from 'react';

import { QuillEditBox } from '@/components';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { errorMessage } from '@/constant';

import Image from 'next/image';
import arrow_back from '@/assets/images/arrow_back.svg';
import Link from 'next/link';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(errorMessage.blankTitle),
});

export default function Write() {
  const [content, setContent] = useState<string>('');

  const handleContent = (value: string) => {
    console.log(value);
    setContent(value);
  };

  return (
    <div className="bg-gray-50">
      <Formik
        initialValues={{ title: '' }}
        validationSchema={ValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          //API 요청
          setSubmitting(true);
          console.log('data', data);
          console.log('content', content);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col shadow-lg p-10 m-auto gap-y-5 max-w-5xl pb-20">
            <div className="flex justify-between">
              <Link href="/">
                <Image
                  src={arrow_back}
                  alt="arrow_back"
                  style={{ width: '30px' }}
                />
              </Link>
              <button
                className="rounded-md w-15 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  errors.title && alert(errors.title);
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
    </div>
  );
}
