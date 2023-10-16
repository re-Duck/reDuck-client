import React from 'react';

interface IProps {
  title: string;
}
function GptTitle({ title }: IProps) {
  return (
    <div className="flex justify-center">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
}

export default GptTitle;
