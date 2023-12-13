import React from 'react';

interface IProps {
  name: string;
  isEssential?: boolean;
}

function FormLabel({ name, isEssential = false }: IProps) {
  const essentialStyle = isEssential
    ? `after:content-["*"] after:text-red-500`
    : '';

  return (
    <label
      className={`min-w-[4rem] w-16 text-xs break-keep sm:text-base sm:w-28 sm:min-w-[7rem] ${essentialStyle}`}
    >
      {name}
    </label>
  );
}

export default FormLabel;
