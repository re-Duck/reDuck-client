import React from 'react';

const CONTENT_HEIGHT = {
  sm: 'h-12',
  md: 'h-72',
};

interface IProps extends React.AllHTMLAttributes<HTMLTextAreaElement> {
  height: keyof typeof CONTENT_HEIGHT;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function GptContent({ height, content, setContent, ...props }: IProps) {
  return (
    <textarea
      className={`w-full p-4 bg-white border-[0.5px] rounded-lg resize-none border-gray-300 ${CONTENT_HEIGHT[height]} outline-0 ovrflow-auto `}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      {...props}
    ></textarea>
  );
}

export default GptContent;
