import React from 'react';
import Icon from '../Icon';
import { iconInfo } from '@/constant';

interface IType {
  type: 'success' | 'warning' | 'error';
}

export default function ModalIcon({ type }: IType) {
  const { color, shape } = iconInfo[type];

  return (
    <div
      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${color}-100 sm:mx-0 sm:h-10 sm:w-10`}
    >
      <Icon name={shape} strokeWidth={2} size={24} color={color} />
    </div>
  );
}
