import React from 'react';

function GptSendButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-2 bg-white border-[0.5px] rounded-lg font-semibold"
      type="submit"
      {...props}
    >
      Send
    </button>
  );
}

export default GptSendButton;
