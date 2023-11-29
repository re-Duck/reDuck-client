import React from 'react';

interface IProps {
  name: string;
  isEssential?: boolean;
}

function FormLabel({ name, isEssential = false }: IProps) {
  const essentialStyle = isEssential
    ? `after:content-['*'] after:color-red`
    : '';

  return <label className={`w-28 min-w-fit ${essentialStyle}`}>{name}</label>;
}

export default FormLabel;
