'use client';

// react
import React from 'react';

// formik
import { Field, FieldAttributes } from 'formik';

function FormInput<T>({ children, ...props }: FieldAttributes<T>) {
  return (
    <Field
      className="h-full min-w-0 p-2 rounded-md shadow-sm grow ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 disabled:opacity-50"
      {...props}
    >
      {children}
    </Field>
  );
}

export default FormInput;
