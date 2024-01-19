import React from 'react';

interface IProps {
  isDisplay?: boolean;
  name?: string;
}

function FormError({ isDisplay, name }: IProps) {
  const style = isDisplay
    ? 'absolute left-0 -bottom-5 text-xs text-red-500'
    : 'hidden';

  return <span className={style}>{name}</span>;
}

export default FormError;
