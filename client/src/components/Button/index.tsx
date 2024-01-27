import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: 'yellow' | 'yellow_line' | 'blue-gray' | 'blue-gray_line';
}
export default function Button(props: ButtonProps) {
  return (
    <button
      className={`text-black bg-yello-scale-400 h-8 px-5 py-1 text-[16px] leading-[20.48px] tracking-[-0.32px] flex gap-[6px] rounded-[2px]`}
      {...props}
    >
      {props.children}
    </button>
  );
}
