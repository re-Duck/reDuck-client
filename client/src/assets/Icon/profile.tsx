import { SVGProps } from 'react';

export default function ProfileIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M12 13C9.23858 13 7 10.7614 7 8V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V8C17 10.7614 14.7614 13 12 13V13Z"
        stroke="#787878"
        strokeWidth="1.5"
      />
      <path
        d="M12 16C8.56169 16 5.32602 16.8676 2.5 18.3959V22H21.5V18.3959C18.674 16.8676 15.4383 16 12 16Z"
        stroke="#787878"
        strokeWidth="1.5"
      />
    </svg>
  );
}
