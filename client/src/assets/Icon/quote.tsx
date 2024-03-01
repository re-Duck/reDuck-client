import { SVGProps } from 'react';
export default function Quote(props: SVGProps<SVGSVGElement>) {
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
        d="M21 4V15.3333L18.3308 21H12.5817L15.251 15.3333H12.7871V4H21ZM19.6312 15.0075V5.41667H14.1559V13.9167H17.4411L14.7719 19.5833H17.4684L19.6312 15.0075ZM11.4183 4V15.3333L8.74905 21H3L5.6692 15.3333H3.20532V4H11.4183ZM10.0494 15.0075V5.41667H4.57414V13.9167H7.85932L5.19011 19.5833H7.88669L10.0494 15.0075Z"
        fill="#646464"
      />
    </svg>
  );
}
