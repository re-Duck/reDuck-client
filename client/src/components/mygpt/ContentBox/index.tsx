import React from 'react';

type IProps = React.HTMLAttributes<HTMLDivElement>;

function GptContextBox({ children }: IProps) {
  return <div className="flex flex-col gap-2 ">{children}</div>;
}

export default GptContextBox;
