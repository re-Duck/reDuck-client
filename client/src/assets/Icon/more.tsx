import { SVGProps } from 'react';

export default function MoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.0002 2V22" stroke="#222222" strokeWidth="1.5" />
      <path d="M2 12L22 12" stroke="#222222" strokeWidth="1.5" />
    </svg>
  );
}
