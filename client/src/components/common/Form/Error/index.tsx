import React from 'react';

interface IProps {
  isDisplay?: boolean;
  name?: string;
}

function FormError({ isDisplay, name }: IProps) {
  return (
    isDisplay && (
      <span className="absolute left-0 -bottom-5 text-xs text-red-500">
        {name}
      </span>
    )
  );
}

export default FormError;
