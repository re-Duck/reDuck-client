import React from 'react';

interface IProps {
  name: string;
}

function FormDiscription({ name }: IProps) {
  return <span className="text-xs text-zinc-500">{name}</span>;
}

export default FormDiscription;
