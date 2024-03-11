import { SVGProps } from 'react';

export default function CodeblockIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M9.62687 2.88721L6.7891 12.8194M5.37021 9.27219L2.53244 6.43442L5.37021 3.59665M11.0458 12.11L13.8835 9.27219L11.0458 6.43442"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.56927 15.8982V21.1127H21.4676V6.21436H16.2532"
        stroke="#030712"
        strokeWidth="1.5"
      />
    </svg>
  );
}
