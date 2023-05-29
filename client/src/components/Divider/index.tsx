import React from 'react';
import {
  widthStyle,
  heightStyle,
  mxStyle,
  myStyle,
} from '@/styles/styleConstant';

interface IDividerProp {
  type: 'horizental' | 'vertical';
  margin: 1 | 4 | 8 | 16;
  thin: 1 | 2 | 4 | 8;
}

export default function Divider({
  type,
  margin,
  thin,
  ...props
}: IDividerProp) {
  const horizentalStyle = `block width-full w-auto ${heightStyle[thin]} ${myStyle[margin]}`;
  const verticalStyle = `relative top-[-1px] inline-block ${widthStyle[thin]} h-full my-0 ${mxStyle[margin]} align-middle`;
  const hrStyle = type === 'horizental' ? horizentalStyle : verticalStyle;
  return <hr className={`border-none bg-slate-400 ${hrStyle}`} {...props} />;
}
