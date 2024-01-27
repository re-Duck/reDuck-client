import { SVGProps } from 'react';

export default function SearchIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
        stroke="#222222"
        strokeWidth="1.5"
      />
      <path
        d="M17.4077 17.4072L22.0001 22"
        stroke="#222222"
        strokeWidth="1.5"
      />
    </svg>
  );
}
