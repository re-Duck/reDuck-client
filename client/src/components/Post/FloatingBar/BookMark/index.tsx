'use client';

import React, { useState } from 'react';

import SaveIcon from '@/assets/Icon/save';

export default function FloatingBarBookMark() {
  const [isSave, setIsSave] = useState(false);

  const handleClick = () => {
    setIsSave((prev) => !prev);
    // TODO: 저장되었다는 토스트 메세지 및 서비스 로직 추가
  };

  return (
    <div className="flex justify-center py-[18px] bg-gray-scale-50 shadow-[inset_0px_-2px] shadow-gray-scale-200">
      <SaveIcon
        fill={isSave ? '#222222' : 'none'}
        onClick={handleClick}
        stroke={isSave ? '#222222' : '#A1A1A1'}
        className="hover:cursor-pointer text-gray-scale-600"
      />
    </div>
  );
}
