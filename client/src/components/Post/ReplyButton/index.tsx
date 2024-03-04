'use client';

import { Icon } from '@iconify/react';
import { ArrowDownIcon } from '@/assets/Icon';

interface IProps {
  type: 'HIDDEN' | 'SHOW' | 'REPLYFORROOT' | 'REPLYFORREPLY';
  onClick: () => void;
  childCount?: number;
}

export default function ReplyButton({ type, childCount, onClick }: IProps) {
  switch (type) {
    case 'HIDDEN':
      return (
        <div
          className="w-fit px-2 py-1 flex gap-1.5 items-center hover:cursor-pointer"
          onClick={onClick}
        >
          <ArrowDownIcon
            transform="rotate(180)"
            width={16}
            height={16}
            className="text-gary-scale-900"
          />
          <span className="text-caption1 text-gray-scale-900">답글 숨기기</span>
        </div>
      );
    case 'SHOW':
      return (
        <div
          className="w-fit px-2 py-1 flex gap-1.5 items-center hover:cursor-pointer"
          onClick={onClick}
        >
          <ArrowDownIcon
            width={16}
            height={16}
            className="text-gary-scale-900"
          />
          <span className="text-caption1 text-gray-scale-900">
            답글 {childCount}개 보기
          </span>
        </div>
      );
    case 'REPLYFORROOT':
      return (
        <div className="w-fit px-2 py-1 flex gap-1.5 items-center hover:cursor-pointer">
          <Icon
            icon="mingcute:pencil-line"
            width={16}
            height={16}
            className="text-gray-scale-900"
          />
          <span className="text-caption1 text-gray-scale-900" onClick={onClick}>
            답글 달기
          </span>
        </div>
      );
    case 'REPLYFORREPLY':
      return (
        <div
          className="mt-3 py-1 flex items-center justify-center gap-1.5 hover:cursor-pointer hover:bg-blue-gray-scale-50 border border-blue-gray-scale-200"
          onClick={onClick}
        >
          <Icon
            icon="mingcute:pencil-line"
            width={16}
            height={16}
            className="text-gray-scale-900"
          />
          <span className="text-caption1 text-gray-scale-900">답글 달기</span>
        </div>
      );
  }
}
