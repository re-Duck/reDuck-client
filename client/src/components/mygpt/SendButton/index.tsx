import React from 'react';

type IProps = React.HTMLAttributes<HTMLButtonElement>;
function GptSendButton({ ...props }: IProps) {
  return (
    <button
      className="px-2 bg-white border-[0.5px] rounded-lg font-semibold"
      {...props}
    >
      Send
    </button>
  );
}

export default GptSendButton;
