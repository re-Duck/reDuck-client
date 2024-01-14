'use client';

import React from 'react';
import { ModalType, iconInfo } from '@/constants/constant';
import { Icon } from '@iconify/react';

interface IType {
  type: ModalType.SUCCESS | ModalType.WARNING | ModalType.ERROR;
}

export default function ModalIcon({ type }: IType) {
  const { color, shape } = iconInfo[type];
  return (
    <div
      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${color}-100 sm:mx-0 sm:h-10 sm:w-10`}
    >
      <Icon icon={shape} color={color} fontSize={24} />
    </div>
  );
}
