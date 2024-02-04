'use client';

import React from 'react';
import Image from 'next/image';

import { positionStyle, avatarSizeStyle } from '@/styles/styleConstant';

// thrid-party
import { Icon } from '@iconify/react';

// service
import { BASE_URL } from '@/service/base/api';

interface IAvatarProp {
  src: string;
  alt: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hasDot?: boolean;
  position?: keyof typeof positionStyle;
}

export default function Avatar({
  src,
  alt,
  size = 'sm',
  hasDot = false,
  position = 'topRight',
}: IAvatarProp) {
  const avatarStyle = `relative rounded-full border border-gray-scale-400 ${avatarSizeStyle[size]} max-w-[200px] max-h-[200px] overflow-hidden`;
  return (
    <div className={avatarStyle}>
      {src === BASE_URL || src === '' ? (
        <Icon
          icon="iconamoon:profile-fill"
          className="object-cover w-full h-full"
        />
      ) : (
        <Image
          src={src}
          width={80}
          height={80}
          alt={alt}
          className="object-cover w-full h-full"
        />
      )}
      {hasDot && (
        <div
          className={`${positionStyle[position]} absolute z-10 bg-white rounded-full p-4`}
        />
      )}
    </div>
  );
}
