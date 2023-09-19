import React from 'react';
import { Field } from 'formik';

function GptQuestion({ ...props }: React.AllHTMLAttributes<HTMLInputElement>) {
  return (
    <Field
      as="input"
      name="question"
      className={`w-full px-4 bg-white border-[0.5px] rounded-lg  border-gray-300 h-10 outline-0`}
      {...props}
    ></Field>
  );
}

export default GptQuestion;
