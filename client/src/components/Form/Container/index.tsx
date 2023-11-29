import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function FormContainer({ children }: IProps) {
  <div className="flex items-center">{children}</div>;
}

export default FormContainer;
