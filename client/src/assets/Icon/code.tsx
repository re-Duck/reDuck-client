import { SVGProps } from 'react';

export default function CodeIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M14.5 3L9.5 21M7 14.5714L2 9.42857L7 4.28571M17 19.7143L22 14.5714L17 9.42857"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
