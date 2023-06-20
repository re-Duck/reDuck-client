import React from 'react';

interface IButtonProp {
  type: 'button' | 'submit';
  name: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({ type, name, disabled, onClick }: IButtonProp) {
  return (
    <button
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
