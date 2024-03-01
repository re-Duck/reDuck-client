import { SVGProps } from 'react';
export default function Link(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_465_10978)">
        <path
          d="M16.8991 9.17164L7.10108 14.8285"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M11.7159 7.26474L18.452 3.37565L22.6946 10.7241L15.9585 14.6132"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M12.2842 16.7349L5.54814 20.624L1.3055 13.2755L8.0416 9.3864"
          stroke="black"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_465_10978">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
