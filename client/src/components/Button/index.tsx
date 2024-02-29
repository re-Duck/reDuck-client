import { ButtonHTMLAttributes } from 'react';

export type ButtonColorType =
  | 'yellow'
  | 'yellow_line'
  | 'blue_gray'
  | 'blue_gray_line';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColorType;
}

export default function Button(props: ButtonProps) {
  const style: Record<ButtonColorType, string> = {
    yellow:
      'bg-yellow-scale-400 text-black hover:active:bg-yellow-scale-500 disabled:bg-yellow-scale-100 disabled:text-gray-scale-700',
    blue_gray:
      'bg-gray-500 text-white hover:active:bg-blue-gray-800 disabled:bg-blue-gray-100',
    yellow_line:
      'bg-yellow-50 border-[1px] border-yellow-500 text-black disabled:bg-gray-50 disabled:border-gray-800 disabled:text-gray-scale-600',
    blue_gray_line:
      'text-black bg-white border border-blue-gray-scale-500 hover:bg-blue-gray-scale-100 disabled:bg-gray-scale-50 disabled:border-blue-gray-scale-800 disabled:text-blue-gray-scale-600 disabled:opacity-40 ',
  } as const;

  return (
    <button
      className={`h-8 px-5 py-1 text-body2 flex gap-[6px] rounded-[2px] items-center ${
        style[props.color]
      }active:bg-blue-gray-scale-100 active:border- active:text-blue-gray-scale-700 `}
      {...props}
    >
      {props.children}
    </button>
  );
}
