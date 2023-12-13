import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function FormContainer({ children }: IProps) {
  return <div className="flex items-center px-2 sm:px-0">{children}</div>;
}

export default FormContainer;
