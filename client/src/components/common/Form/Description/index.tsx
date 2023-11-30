import React from 'react';

interface IProps {
  name: string;
}

function FormDiscription({ name }: IProps) {
  return <span className="hidden text-xs text-zinc-500 sm:block">{name}</span>;
}

export default FormDiscription;
