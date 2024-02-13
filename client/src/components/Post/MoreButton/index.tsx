'use client';

import React, { useState, useEffect, useRef } from 'react';

import { Icon } from '@iconify/react';

interface IProps {
  IS_AUTHOR: boolean;
}

export default function MoreButton({ IS_AUTHOR }: IProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <Icon
        icon="mingcute:more-2-fill"
        fontSize={24}
        className="text-gray-scale-600 hover:cursor-pointer"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="absolute right-0 z-20 flex flex-col w-32 gap-1 px-4 py-1 border min-w-max bg-gray-scale-50 border-gray-scale-400">
          {IS_AUTHOR && (
            <>
              <div className="py-2 hover:cursor-pointer">수정하기</div>
              <div className="py-2 hover:cursor-pointer">삭제하기</div>
            </>
          )}
          <div className="py-2 hover:cursor-pointer">신고하기</div>
        </div>
      )}
    </div>
  );
}
