import { SVGProps } from 'react';

export default function AlertIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M5 9V14L3 18H21L19 14V9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9Z"
        stroke="#222222"
        strokeWidth="1.5"
      />
      <path d="M10 22H14" stroke="#222222" strokeWidth="1.5" />
    </svg>
  );
}
