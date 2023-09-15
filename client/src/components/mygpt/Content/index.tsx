import React from 'react';

const CONTENT_HEIGHT = {
  sm: 'h-10',
  md: 'h-72',
};

interface IProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  height: keyof typeof CONTENT_HEIGHT;
}

function GptContent({ height, ...props }: IProps) {
  return (
    <textarea
      className={`w-full p-4 bg-white border-[0.5px] rounded-lg resize-none border-gray-300 ${CONTENT_HEIGHT[height]} outline-0`}
      {...props}
    ></textarea>
  );
}

export default GptContent;
