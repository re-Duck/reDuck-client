import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function FormBox({ children }: IProps) {
  return (
    <div className="flex gap-x-4 items-baseline flex-wrap">{children}</div>
  );
}

export default FormBox;
