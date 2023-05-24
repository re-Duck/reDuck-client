import React from 'react';

interface IType {
  type: 'check' | 'yes' | 'cancle';
  onClick: () => void;
}

const CONTENT = {
  check: {
    content: '확인',
    className:
      'inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto',
  },
  yes: {
    content: '예',
    className:
      'inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto',
  },
  cancle: {
    content: '취소',
    className:
      'inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto',
  },
};

export default function ModalButton({ type, onClick }: IType) {
  const { content, className } = CONTENT[type];

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}
