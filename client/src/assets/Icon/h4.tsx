import { SVGProps } from 'react';
export default function H4(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_865_14150)">
        <path
          d="M15.18 15.498H8.42V24H6.158V6.086H8.42V13.652H15.18V6.086H17.442V24H15.18V15.498Z"
          fill="#646464"
        />
        <path
          d="M25.336 21.996H24.268V24H23.296V21.996H19.864V21.252L22.288 15.6L23.128 15.96L20.932 21.18H23.308L23.392 18.84H24.268V21.18H25.336V21.996Z"
          fill="#646464"
        />
      </g>
      <defs>
        <clipPath id="clip0_865_14150">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
