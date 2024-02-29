import { SVGProps } from 'react';

interface ArrowDownIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export default function ArrowDownIcon(props: ArrowDownIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={props.className}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={` ${props.color ?? '#030712'}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
