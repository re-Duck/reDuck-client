import { Icon } from '@iconify/react';
import React from 'react';
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
}

function GptSendButton({ disabled, ...props }: IProps) {
  return (
    <button
      className={`px-2 bg-white border-[0.5px] rounded-lg font-semibold w-10 flex justify-center items-center`}
      type="submit"
      {...props}
    >
      <Icon
        icon={`${disabled ? 'line-md:loading-loop' : 'bi:send'}`}
        style={{ fontSize: 16, color: '#8c8c8c' }}
      />
    </button>
  );
}

export default GptSendButton;
