import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  setIsAnswerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function GptSendButton({ setIsAnswerOpen }: IProps) {
  return (
    <button
      className="px-2 bg-white border-[0.5px] rounded-lg font-semibold"
      onClick={() => setIsAnswerOpen((prev) => !prev)}
    >
      Send
    </button>
  );
}

export default GptSendButton;
