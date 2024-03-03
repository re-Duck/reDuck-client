import React from 'react';

interface IDividerProp {
  type: 'horizental' | 'vertical';
  margin: number;
  thin: number;
}

export default function Divider({
  type,
  margin,
  thin,
  ...props
}: IDividerProp) {
  const horizentalStyle = `block width-full w-auto h-[${thin}px] my-${margin}`;
  const verticalStyle = `relative inline-block w-[${thin}px] h-full min-h-4 my-0 mx-${margin} align-middle`;
  const hrStyle = type === 'horizental' ? horizentalStyle : verticalStyle;
  return (
    <hr className={`border-none bg-gray-scale-600 ${hrStyle}`} {...props} />
  );
}
