import { SVGProps } from 'react';

export default function Check(props: SVGProps<SVGSVGElement>) {
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
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke={props.stroke ?? 'black'}
        strokeWidth={props.strokeWidth ?? '1.5'}
        strokeLinecap="square"
      />
    </svg>
  );
}
