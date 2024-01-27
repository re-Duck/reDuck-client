import { ButtonHTMLAttributes } from 'react';

export type ButtonColorType =
  | 'yellow'
  | 'yellow_line'
  | 'blue_gray'
  | 'blue_gray_line';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorType: ButtonColorType;
}

export default function Button(props: ButtonProps) {
  const style: Record<ButtonColorType, string> = {
    yellow:
      'bg-yello-scale-400 text-black hover:active:bg-yello-scale-500 disabled:bg-yello-scale-100 disabled:text-gray-scale-700',
    blue_gray:
      'bg-gray-500 text-white hover:active:bg-blue-gray-800 disabled:bg-blue-gray-100',
    yellow_line:
      'bg-yellow-50 border-[1px] border-yellow-500 text-black disabled:bg-gray-50 disabled:border-gray-800 disabled:text-gray-scale-600',
    blue_gray_line:
      'bg-blue-gray-scale-100 border-[1px] border-gray-900 disabled:bg-gray-scale-50 disabled:border-gray-800 disabled:text-blue-gray-600',
  } as const;

  return (
    <button
      className={` h-8 px-5 py-1 text-[16px] leading-[20.48px] tracking-[-0.32px] flex gap-[6px] rounded-[2px] ${
        style[props.colorType]
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
}
