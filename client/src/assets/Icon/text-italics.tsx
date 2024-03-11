import { SVGProps } from 'react';

export default function TextItalicsIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M11 5H14M17 5H14M7 19H10M13 19H11.5H10M14 5C12.4379 10.4673 11.5621 13.5327 10 19"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
