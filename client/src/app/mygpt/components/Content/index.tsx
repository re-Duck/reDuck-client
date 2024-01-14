'use client';

import React from 'react';
import { Field } from 'formik';

const CONTENT_HEIGHT = {
  sm: 'h-12',
  md: 'h-72',
};

interface IProps extends React.AllHTMLAttributes<HTMLTextAreaElement> {
  height: keyof typeof CONTENT_HEIGHT;
  content?: string;
}

function GptContent({ height, content, ...props }: IProps) {
  return (
    <Field
      as="textarea"
      className={`w-full p-4 bg-white border-[0.5px] rounded-lg resize-none border-gray-300 ${CONTENT_HEIGHT[height]} outline-0 ovrflow-auto `}
      {...props}
      value={content}
    ></Field>
  );
}

export default GptContent;
