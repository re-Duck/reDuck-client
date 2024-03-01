import { SVGProps } from 'react';
export default function Strikethrough(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="5"
        y1="15.25"
        x2="25"
        y2="15.25"
        stroke="#646464"
        strokeWidth="1.5"
      />
      <line x1="5" y1="5.5" x2="25" y2="5.5" stroke="#646464" strokeWidth="3" />
      <line x1="15" y1="19" x2="15" y2="26" stroke="#646464" strokeWidth="3" />
      <line x1="15" y1="7" x2="15" y2="12" stroke="#646464" strokeWidth="3" />
    </svg>
  );
}
