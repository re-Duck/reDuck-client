import { Icon } from '@iconify/react';
import React from 'react';
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
}

function GptSendButton({ disabled, ...props }: IProps) {
  return (
    <button
      className={`${
        disabled ? 'bg-white' : 'bg-[#5046E5]'
      } rounded-md w-7 h-7 font-semibold  flex justify-center items-center ${
        disabled && 'cursor-not-allowed'
      } transition-colors`}
      type="submit"
      disabled={disabled}
      {...props}
    >
      <Icon
        icon="ion:send"
        style={{ fontSize: 14, color: disabled ? '#0000002d' : '#fff' }}
        className="transition-colors"
      />
    </button>
  );
}

export default GptSendButton;
