'use client';

import React, { useState } from 'react';

import HeartIcon from '@/assets/Icon/heart';

interface IProps {
  InitialLikes: number;
}

export default function FloatingBarLike({ InitialLikes }: IProps) {
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(InitialLikes);

  const handleClick = () => {
    if (isLike) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLike((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center py-1.5 mx-[5px] gap-2 px-[5px] bg-gray-scale-50 shadow-[inset_0px_-2px] shadow-gray-scale-200">
      <p className="font-bold">{likes}</p>
      <HeartIcon
        className="hover:cursor-pointer"
        fill={isLike ? '#F2415A' : 'none'}
        stroke={isLike ? 'none' : '#A1A1A1'}
        onClick={handleClick}
      />
    </div>
  );
}
