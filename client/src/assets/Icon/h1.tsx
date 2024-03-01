import { SVGProps } from 'react';
export default function H1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_865_14153)">
        <path
          d="M15.18 15.498H8.42V24H6.158V6.086H8.42V13.652H15.18V6.086H17.442V24H15.18V15.498Z"
          fill="#646464"
        />
        <path
          d="M25.204 23.184V24H20.44V23.184H22.468V16.836L20.584 17.976L20.14 17.268L22.6 15.732H23.488V23.184H25.204Z"
          fill="#646464"
        />
      </g>
      <defs>
        <clipPath id="clip0_865_14153">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
