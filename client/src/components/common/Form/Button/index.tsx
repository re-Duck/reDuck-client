import React from 'react';

interface IProps {
  type: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  name: string | React.ReactNode;
}

function FormButton({ type, onClick, disabled, name }: IProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="min-w-fit p-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 sm:w-24 sm:text-base"
    >
      {name}
    </button>
  );
}

export default FormButton;
