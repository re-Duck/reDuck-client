// react
import React from 'react';

// formik
import { Field } from 'formik';

interface IProps {
  type: 'text' | 'password' | 'file';
  name: string;
  placeholder: string;
}

function FormInput({ type, name, placeholder }: IProps) {
  return (
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className="h-full p-2 rounded-md shadow-sm grow ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
    />
  );
}

export default FormInput;
