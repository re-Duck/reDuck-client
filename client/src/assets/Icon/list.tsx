import { SVGProps } from 'react';

export default function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.5 21C4.32843 21 5 20.3284 5 19.5C5 18.6716 4.32843 18 3.5 18C2.67157 18 2 18.6716 2 19.5C2 20.3284 2.67157 21 3.5 21Z"
        fill="black"
      />
      <path d="M7 19.5H22" stroke="black" strokeWidth="1.5" />
      <path
        d="M3.5 14C4.32843 14 5 13.3284 5 12.5C5 11.6716 4.32843 11 3.5 11C2.67157 11 2 11.6716 2 12.5C2 13.3284 2.67157 14 3.5 14Z"
        fill="black"
      />
      <path d="M7 12.5H22" stroke="black" strokeWidth="1.5" />
      <path
        d="M3.5 6C4.32843 6 5 5.32843 5 4.5C5 3.67157 4.32843 3 3.5 3C2.67157 3 2 3.67157 2 4.5C2 5.32843 2.67157 6 3.5 6Z"
        fill="black"
      />
      <path d="M7 4.5H22" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}
