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
      'bg-yello-scale-400 text-black hover:bg-yello-scale-500 active:bg-yello-scale-500 disabled:bg-yello-scale-100 disabled:text-gray-scale-700',
    blue_gray:
      'bg-blue-gray-scale-500 text-white hover:bg-blue-gray-scale-800 active:bg-blue-gray-scale-800 disabled:bg-blue-gray-scale-100',
    yellow_line:
      'bg-yello-scale-50 border border-yello-scale-500 text-black disabled:bg-gray-scale-50 disabled:border-gray-scale-800 disabled:text-gray-scale-600',
    blue_gray_line:
      'bg-blue-gray-scale-100 border border-gray-900 disabled:bg-gray-scale-50 disabled:border-gray-800 disabled:text-blue-gray-600',
  } as const;

  return (
    <button
      className={`h-8 px-5 py-1 text-[16px] leading-[20.48px] tracking-[-0.32px] flex gap-[6px] rounded-[2px] items-center ${
        style[props.color]
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
}
