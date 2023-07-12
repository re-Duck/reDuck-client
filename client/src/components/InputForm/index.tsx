import React from 'react';

import { Field } from 'formik';

interface IInputFormProp {
  labelName: string;
  inputType: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: React.ReactNode;
}

export default function InputForm({
  labelName,
  inputType,
  name,
  required = false,
  placeholder = '',
  errorMessage,
}: IInputFormProp) {
  return (
    <div className="inline-flex w-full h-[38px] items-center">
      <label className="text-xs w-20 sm:text-base sm:w-28">
        {labelName}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Field
        type={inputType}
        name={name}
        className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
        placeholder={placeholder}
      />
      {errorMessage}
    </div>
  );
}
