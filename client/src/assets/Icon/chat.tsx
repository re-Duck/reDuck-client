import { SVGProps } from 'react';

export default function ChatIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M7 19.9998H2L4.0505 16.7192C2.76939 15.1643 2 13.172 2 11C2 6.02944 6.02944 2 11 2C14.5337 2 17.5918 4.03656 19.0645 7"
        stroke="black"
        strokeWidth="1.5"
      />
      <path
        d="M15.5 22C11.9101 22 9 19.0899 9 15.5C9 11.9101 11.9101 9 15.5 9C19.0899 9 22 11.9101 22 15.5C22 17.0687 21.4443 18.5075 20.5191 19.6305L22 21.9998L15.5 22Z"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
}
