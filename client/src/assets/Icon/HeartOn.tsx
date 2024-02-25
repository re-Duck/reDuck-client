import { SVGProps } from 'react';

interface HeartOnProps extends SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}
export default function HeartOn(props: HeartOnProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_90_4023)">
        <path
          d="M6 3L12 7L18 3L22 7L22 13L12 22L2 13L2 7L6 3Z"
          fill={props.fill ?? '#222222'}
          stroke={props.stroke ?? '#222222'}
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_90_4023">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(24 24) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
