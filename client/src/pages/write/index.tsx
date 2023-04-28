import React from 'react';
import Layout from '@/components/Layout';

import { QuillEditBox } from '@/components';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { errorMessage } from '@/constant';

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(errorMessage.blankTitle),
});

export default function Write() {
  return (
    <Layout>
      <Formik initialValues={{ title: '' }} validationSchema={ValidationSchema}>
        <input type="text" className="" />
        <QuillEditBox />
      </Formik>
    </Layout>
  );
}
