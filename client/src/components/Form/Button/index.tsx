import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit';
}

function FormButton({ type, onClick, disabled, children }: IProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="min-w-fit p-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 sm:w-24 sm:text-base"
    >
      {children}
    </button>
  );
}

export default FormButton;
