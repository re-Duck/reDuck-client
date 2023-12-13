// react
import React from 'react';

// thrid-party
import { Icon } from '@iconify/react';

export default function Advertisement() {
  return (
    <div className="flex-col items-center justify-center hidden bg-white border-2 border-gray-100 rounded-lg w-60 md:flex bg-blue-5 h-60">
      <Icon icon="ri:advertisement-fill" fontSize={60} />
      <p>준비중...</p>
    </div>
  );
}
