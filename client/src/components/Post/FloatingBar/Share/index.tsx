'use client';

import React, { useState } from 'react';

import { Icon } from '@iconify/react';

export default function FloatingBarShare() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative flex justify-center py-[18px] ${
        open ? 'bg-yellow-scale-50' : 'bg-gray-scale-50'
      }`}
    >
      <Icon
        icon="quill:share"
        fontSize={24}
        className="hover:cursor-pointer text-blue-gray-scale-300"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute flex flex-col gap-2 -top-10 -right-12">
          <div className="px-1 py-2 bg-white shadow-md">
            <Icon
              className="text-gray-scale-600"
              icon="emojione-monotone:link"
              fontSize={24}
            />
          </div>
          <div className="px-1 py-2 bg-white shadow-md">
            <Icon
              className="text-gray-scale-600"
              icon="ant-design:instagram-outlined"
              strokeWidth={1}
              fontSize={24}
            />
          </div>
          <div className="px-1 py-2 bg-white shadow-md">
            <Icon
              className="text-gray-scale-600"
              icon="gg:facebook"
              strokeWidth={1}
              fontSize={24}
            />
          </div>
        </div>
      )}
    </div>
  );
}
