import { SVGProps } from 'react';
export default function Close(props: SVGProps<SVGSVGElement>) {
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
        d="M19.0713 4.9292L4.92915 19.0713"
        stroke={props.stroke ?? '#222222'}
        strokeWidth="1.5"
      />
      <path
        d="M4.92896 4.92871L19.0711 19.0708"
        stroke={props.stroke ?? '#222222'}
        strokeWidth="1.5"
      />
    </svg>
  );
}
