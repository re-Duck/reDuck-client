import { SVGProps } from 'react';

export default function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 22V2H22V22H2Z" stroke="black" strokeWidth="1.5" />
      <path
        d="M7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5Z"
        stroke="black"
        strokeWidth="1.5"
      />
      <path d="M2 17H22" stroke="black" strokeWidth="1.5" />
      <path d="M22 15L16 9L8 17" stroke="black" strokeWidth="1.5" />
    </svg>
  );
}
