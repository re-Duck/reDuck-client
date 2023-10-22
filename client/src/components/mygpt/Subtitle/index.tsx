import React from 'react';

interface IProps {
  title: string;
}
function GptSubTitle({ title }: IProps) {
  return <h2 className="text-xl font-bold">{title}</h2>;
}

export default GptSubTitle;
