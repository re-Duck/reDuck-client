import React from 'react';

interface IProps {
  isDisplay: boolean;
  name: string;
}

function FormError({ isDisplay, name }: IProps) {
  return (
    isDisplay && (
      <span className="h-0 text-xs text-red-500 translate-y-2">{name}</span>
    )
  );
}

export default FormError;
