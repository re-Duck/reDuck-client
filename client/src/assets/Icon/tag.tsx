import { SVGProps } from 'react';
export default function Tag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_723_8576)">
        <path
          d="M6.33073 0.666504L3.66406 15.3332"
          stroke="#40404D"
          strokeWidth="1.5"
        />
        <path
          d="M12.3307 0.666504L9.66406 15.3332"
          stroke="#40404D"
          strokeWidth="1.5"
        />
        <path d="M15.3333 5H2" stroke="#40404D" strokeWidth="1.5" />
        <path d="M13.9974 11H0.664062" stroke="#40404D" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip0_723_8576">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
