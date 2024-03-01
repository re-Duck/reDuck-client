import { SVGProps } from 'react';
export default function Bold(props: SVGProps<SVGSVGElement>) {
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
        d="M6 3H5V21H14C15.1072 21.0002 16.1831 20.633 17.059 19.9558C17.9349 19.2787 18.5614 18.33 18.84 17.2584C19.1187 16.1869 19.0338 15.0532 18.5987 14.0352C18.1637 13.0171 17.403 12.1722 16.436 11.633C17.1632 10.9453 17.6674 10.0552 17.8831 9.0779C18.0989 8.10056 18.0164 7.08096 17.6463 6.15103C17.2761 5.2211 16.6355 4.42365 15.8071 3.86188C14.9788 3.3001 14.0009 2.99986 13 3H6ZM13 11H7V5H13C13.7956 5 14.5587 5.31607 15.1213 5.87868C15.6839 6.44129 16 7.20435 16 8C16 8.79565 15.6839 9.55871 15.1213 10.1213C14.5587 10.6839 13.7956 11 13 11ZM7 13H14C14.7956 13 15.5587 13.3161 16.1213 13.8787C16.6839 14.4413 17 15.2044 17 16C17 16.7956 16.6839 17.5587 16.1213 18.1213C15.5587 18.6839 14.7956 19 14 19H7V13Z"
        fill="black"
      />
    </svg>
  );
}
