import React from 'react';

interface IProps extends React.AllHTMLAttributes<HTMLInputElement> {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function GptQuestion({ content, setContent, ...props }: IProps) {
  return (
    <input
      className={`w-full px-4 bg-white border-[0.5px] rounded-lg  border-gray-300 h-10 outline-0`}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      {...props}
    ></input>
  );
}

export default GptQuestion;
