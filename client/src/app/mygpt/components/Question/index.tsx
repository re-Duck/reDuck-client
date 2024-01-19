'use client';

import React from 'react';
import { Field } from 'formik';

function GptQuestion({
  children,
  ...props
}: React.AllHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={`w-full px-3 bg-white border-[0.5px] rounded-lg  border-gray-300 h-10 outline-0 flex justify-between items-center`}
    >
      <Field
        as="input"
        name="question"
        className={`w-full bg-white h-full outline-0`}
        {...props}
      />
      {children}
    </div>
  );
}

export default GptQuestion;
